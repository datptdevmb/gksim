import AppHeader from "@/components/Header/Header";
import NewsCard from "@/components/News/NewsCard";
import useAppNavigation from "@/hooks/useNavigation";
import { useEffect, useState } from "react";
import { getCategories, getNewsByCategory } from "@/services/News";
import images from "@/assets/images";

export default function NewsPage() {
    const { goToNewsDetailPage } = useAppNavigation();

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");


    useEffect(() => {
        async function fetchCategories() {
            try {
                const cate = await getCategories();
                if (cate) setCategories(cate);
            } catch (err) {
                console.error("Lỗi khi fetch categories:", err);
            }
        }
        fetchCategories();
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchText]);


    useEffect(() => {
        async function fetchNews() {
            setLoading(true);
            try {
                const list = await getNewsByCategory(activeCategory, debouncedSearch);
                if (list) setNewsList(list);
            } catch (err) {
                console.error("Lỗi khi fetch news:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, [activeCategory, debouncedSearch]);

    return (
        <div className="flex flex-col flex-1">
            <div className="flex-1 overflow-y-auto bg-white">

                {/* Tabs danh mục */}
                <div className="flex overflow-x-auto px-4 gap-4 py-2 bg-white border-b">
                    {/* Tab "Tất cả" */}
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={`text-sm whitespace-nowrap ${activeCategory === "all"
                            ? "text-blue-600 font-semibold"
                            : "text-gray-500"
                            }`}
                    >
                        Tất cả
                    </button>

                    {/* Các danh mục từ API */}
                    {categories && categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`text-sm whitespace-nowrap ${activeCategory === cat.id
                                ? "text-blue-600 font-semibold"
                                : "text-gray-500"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Search bar */}
                <div className="px-4 py-2 bg-white">
                    <input
                        type="text"
                        placeholder="Tìm kiếm nhanh"
                        className="w-full border rounded px-3 py-2 text-sm"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                {/* Danh sách bài viết */}
                <div className="px-4 space-y-4 pb-4">
                    {loading ? (
                        <p className="text-center text-sm text-gray-400">Đang tải...</p>
                    ) : newsList.length > 0 ? (
                        newsList.map((item, idx) => (
                            <NewsCard
                                key={idx}
                                image={item.image || images.post1}
                                date={item.date}
                                title={item.title}
                                summary={item.summary}
                                onClick={() => goToNewsDetailPage(item.id)}
                            />
                        ))
                    ) : (
                        <p className="text-center text-sm text-gray-400">Không có bài viết nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
