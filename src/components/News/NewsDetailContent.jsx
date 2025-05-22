import { Modal, Icon, Box } from "zmp-ui";
import { useState } from "react";
import FormFooterButton from "@/components/Footer/FormFooterButton";

export default function NewsDetailContent({ image, date, author, title, content }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-white">
            <img src={image} alt="news" className="rounded-t-xl w-full object-cover mb-3" />
                <div className="text-xs text-gray-500 mb-1">{date} · Bởi {author}</div>
                <h1 className="text-lg font-bold text-black mb-3">{title}</h1>
                <div className="text-sm text-gray-800 whitespace-pre-line mb-4">
                    {content}
                </div>
        </div>
    );
}
