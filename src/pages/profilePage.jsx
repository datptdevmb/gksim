import images from "@/assets/images";
import ButtonApp from "@/components/Button/ButtonApp";
import Container from "@/components/Container/Container";
import Header from "@/components/Header/Header";
import useAppNavigation from "@/hooks/useNavigation";
import { getUserInfor } from "@/services/auth";
import { useEffect, useState } from "react";
import { Icon } from "zmp-ui";

export default function ProfilePage() {
    const { goToEditProfile, goToMbtiTest } = useAppNavigation();
    const [user, setUser] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem("user_id");

        getUserInfor(userId)
            .then((data) => setUser(data))
            .catch(() => setUser([]));

    }, []);

    return (
        <Container>
            <div className=" pt-2 space-y-4">

                <button
                    onClick={goToEditProfile}
                    className="bg-white text-black rounded w-full flex items-center justify-between px-4 py-3 shadow cursor-pointer hover:bg-gray-100 transition"
                >
                    <div className="flex items-center gap-3">
                        <img
                            src={user?.avatar || images.avatar}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">{user?.name}</span>
                    </div>

                    <div className="w-6 h-6 flex items-center justify-center text-blue-600">
                        <Icon icon="zi-edit" className="text-lg" />

                    </div>
                </button>


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
                        onClick={goToMbtiTest}
                    />
                </div>
            </div>
        </Container>
    );
}
