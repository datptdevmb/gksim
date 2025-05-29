import AppHeader from "@/components/Header/AppHeader";
import NewsDetailContent from "@/components/News/NewsDetailContent";
import ButtonApp from "@/components/Button/ButtonApp";
import images from "@/assets/images";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsDetail } from "@/services/News";

export default function NewsDetailPage() {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetail() {
            try {
                const data = await getNewsDetail(id);
                if (data) setNews(data);
            } catch (err) {
                console.error("Lỗi khi lấy chi tiết bài viết:", err);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchDetail();
    }, [id]);

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto bg-white">
                {loading ? (
                    <p className="text-center text-sm text-gray-400 p-4">Đang tải nội dung...</p>
                ) : news ? (
                    <NewsDetailContent
                        image={news.image || images.post1}
                        date={news.date}
                        author={news.author}
                        title={news.title}
                        content={news.content}
                    />
                ) : (
                    <p className="text-center text-sm text-red-500 p-4">Không tìm thấy bài viết.</p>
                )}
            </div>

            <div className="p-4 w-full bg-white border-t">
                <ButtonApp fullWidth size="lg" title="Chia sẻ" onClick={() => alert("Chia sẻ!")} />
            </div>
        </div>
    );
}
