import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "zmp-ui";
import ConfirmJoinModal from "@/pages/Search/modal";

const navItems = [
    { path: "/", label: "Trang chủ", icon: "zi-home" },
    { path: "/SearchPage", label: "Tìm kiếm", icon: "zi-search" },
    { path: "/Booking", label: "Đặt lịch", icon: "zi-calendar" },
    { path: "/Noticate", label: "Thông báo", icon: "zi-notif" },
    { path: "/Setting", label: "Cá nhân", icon: "zi-user" },
];

const HIDDEN_PATHS = [
    "/newsPost",
    "/news-detail",
    "/editprofile",
    "/mentee",
    "/Regis",
    "/mentor",
    "/booking-detail",
    "/booking-confirm",
];

const isLoggedIn = () => {
    return true;
};

export default function BottomNav() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    if (HIDDEN_PATHS.includes(location.pathname)) return null;

    const handleNavigation = (path) => {
        if (path === "/Booking" && !isLoggedIn()) {
            setShowModal(true);
        } else {
            navigate(path);
        }
    };

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-40 h-[80px]">
                {navItems.map(({ path, label, icon }) => {
                    const isActive = location.pathname === path;

                    return (
                        <button
                            key={path}
                            onClick={() => handleNavigation(path)}
                            className={`flex flex-col items-center text-xs ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"
                                }`}
                        >
                            <Icon icon={icon} className="text-lg" />
                            <span className="mt-1">{label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* ✅ Modal được render đúng cách */}
            <ConfirmJoinModal show={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}
