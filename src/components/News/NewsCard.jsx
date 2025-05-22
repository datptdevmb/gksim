export default function NewsCard({ image, date, title, summary }) {
    return (
        <div className="flex gap-3 p-3">
            <img
                src={image}
                alt="news"
                className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-gray-200"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div
                    className="inline-block w-[80px] text-[11px] text-black mb-1 px-3 py-1 bg-gray-200 rounded-full border border-gray-300"
                >
                    {date}
                </div>
                <div className="font-semibold text-[15px] text-gray-900 mb-1 leading-tight line-clamp-2">
                    {title}
                </div>
                <div className="text-xs text-gray-600 line-clamp-2">
                    {summary}
                </div>
            </div>
        </div>
    );
}
