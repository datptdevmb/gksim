

import NewsCard from "@/components/News/NewsCard";
import useBlog from "@/hooks/useBlog";
import TabBar from "@/components/Tab/TabBar";
import InputApp from "@/components/Input/InputApp";
import StateRenderer from "@/components/Common/StateRenderer";

export default function BlogPage() {
    const {
        blogs,
        loading,
        categories,
        activeCategory,
        searchText,
        setActiveCategory,
        setSearchText,
        handleClick,
    } = useBlog();

    return (
        <>
            <TabBar
                tabs={[{ id: "all", name: "Tất cả" }, ...categories]}
                activeTab={activeCategory}
                onChange={setActiveCategory}
            />

            <div className="px-4 py-2 bg-white">
                <InputApp
                    placeholder="Tìm kiếm bài viết..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <div className="space-y-4 pb-4">
                <StateRenderer loading={loading} data={blogs}>
                    {blogs.map((item, index) => (
                        <NewsCard key={index} {...item} onClick={() => handleClick(item.id)} />
                    ))}
                </StateRenderer>
            </div>
        </>
    );
}
