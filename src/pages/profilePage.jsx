import images from "@/assets/images";
import ButtonApp from "@/components/Button/ButtonApp";
import Container from "@/components/Container/Container";
import Header from "@/components/MainHeader/MainHeader";
import useAppNavigation from "@/hooks/useNavigation";
import { Icon } from "zmp-ui"; // hoặc dùng react-icons nếu zmp-ui lỗi

export default function ProfilePage() {
    const { goToEditProfile, goToMbtiTest } = useAppNavigation();

    return (
        <Container>
        <button
            onClick={goToEditProfile}
            className="bg-white text-black rounded w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition mb-4"
        >
            <div className="flex items-center gap-3">
                <img
                    src="https://i.pravatar.cc/100"
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <span className="text-sm font-medium">Mentor Nguyễn Văn A</span>
            </div>

            <div className="w-6 h-6 flex items-center justify-center text-blue-600">
                <Icon  icon="zi-edit" className="text-lg text-xl mt-[-5px]" />
            </div>
        </button>


        <div className="bg-white text-black rounded px-3 py-3 shadow flex items-center justify-between hover:bg-gray-100 transition">
            <div className="flex items-center gap-2">
                <img
                    src={images.imagepf || "https://via.placeholder.com/80"}
                    alt="MBTI Test"
                    className="w-12 h-12 rounded object-cover"
                />
                <div>
                    <p className="text-sm font-semibold">Trắc nghiệm tính cách</p>
                    <p className="text-xs text-gray-500">Test MBTI/DISC</p>
                </div>
            </div>
            <ButtonApp
                title="Thực hiện bài test"
                size="sm"
                gradient
                rounded
                onClick={goToMbtiTest}
            />
        </div>
</Container>
    );
}
