export default function LoadingOrList({
    isLoading,
    data = [],
    renderItem,
    emptyText = "Không có dữ liệu.",
    loadingText = "Đang tải...",
    minHeight = "240px",
}) {
    return (
        <div
            className={`bg-white mt-2 rounded-lg overflow-hidden`}
            style={{ minHeight }}
        >
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400 text-sm animate-pulse">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <span>{loadingText}</span>
                </div>
            ) : data.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                    {emptyText}
                </div>
            ) : (
                <div className="divide-y">
                    {data.map((item, idx) => renderItem(item, idx))}
                </div>
            )}
        </div>
    );
}
