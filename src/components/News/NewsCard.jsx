import { memo } from "react";
import { newsCardClasses } from "./NewCard.Config"

function NewsCard({
    image,
    date,
    title,
    summary,
    onClick,
    classNames = {},
}) {
    return (
        <div
            onClick={onClick}
            className={`${newsCardClasses.container} ${classNames.container || ""}`}
        >
            <img
                src={image}
                alt={title || "news-image"}
                className={`${newsCardClasses.image} ${classNames.image || ""}`}
            />
            <div className={`flex-1 space-y-1 ${classNames.body || ""}`}>
                <p className={newsCardClasses.date}>{date}</p>
                <h3 className={newsCardClasses.title}>{title}</h3>
                <p className={newsCardClasses.summary}>{summary}</p>
            </div>
        </div>
    );
}


export default memo(NewsCard);

