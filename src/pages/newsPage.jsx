import { Tabs, Input } from "zmp-ui";
import NewsCard from "@/components/News/NewsCard";
import useAppNavigation from "@/hooks/useNavigation";
import { useState } from "react";
import images from "@/assets/images";

export default function NewsPage() {
    const { goToNewsDetailPage } = useAppNavigation();

    const categories = [
        { id: "all", label: "Tất cả" },
        { id: "cat1", label: "Danh mục 1" },
        { id: "cat2", label: "Danh mục 2" },
        { id: "cat3", label: "Danh mục 3" },
        { id: "cat4", label: "Danh mục 4" },
    ];

    const [activeCategory, setActiveCategory] = useState("all");

    return (
        <div className="flex flex-col flex-1 bg-[#f5f6fa] min-h-screen">
            <Tabs
                value={activeCategory}
                onChange={setActiveCategory}
                scrollable
                className="bg-white px-2 pt-2"
            >
                {categories.map((cat) => (
                    <Tabs.Tab
                        key={cat.id}
                        value={cat.id}
                        label={cat.label}
                        className="!text-base"
                    />
                ))}
            </Tabs>
            <div className="px-4 py-2 bg-white sticky top-0 z-10">
                <Input
                    placeholder="Tìm kiếm nhanh"
                    clearable
                    className="rounded-lg"
                />
            </div>
            <div className="px-2 space-y-3 pb-4">
                {[...Array(10)].map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-md cursor-pointer mb-3 mx-2 transition hover:shadow-lg"
                        onClick={goToNewsDetailPage}
                        style={{ minHeight: 80 }}
                    >
                        <NewsCard
                            image={images.post1}
                            date="05/03/2024"
                            title="Hãng Công Nghệ X Ra Mắt Điện Thoại Mới Với Công Nghệ AI Tích Hợp"
                            summary="Hãng công nghệ X vừa chính thức giới thiệu mẫu điện thoại mới nhất với chip xử lý AI mạnh mẽ, giúp tối ưu hóa trải nghiệm người dùng."
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
