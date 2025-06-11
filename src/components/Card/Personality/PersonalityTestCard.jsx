import { memo } from "react";
import images from "@/assets/images";
import ButtonApp from "../../Button/ButtonApp";

const PersonalityTestCard = ({ onClick }) => (
    <div className="bg-white text-black rounded px-4 py-3 shadow flex items-center justify-between hover:bg-gray-100 transition">
        <div className="flex items-center gap-3">
            <img
                src={images.imagepf || "https://via.placeholder.com/80"}
                alt="MBTI Test"
                className="w-12 h-12 rounded object-cover"
            />
            <div>
                <p className="text-sm font-semibold">Trắc nghiệm tính cách</p>
                <p className="text-sm text-gray-500">Test MBTI/DISC</p>
            </div>
        </div>
        <ButtonApp
            title="Thực hiện bài test"
            size="sm"
            gradient
            // onClick={goToMb}
        />
    </div>
);

export default memo(PersonalityTestCard);