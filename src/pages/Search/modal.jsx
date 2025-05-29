import images from "@/assets/images";

export default function ConfirmJoinModal({ show, onClose, onConfirm }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-40 flex items-end">
            <div className="w-full bg-white rounded-t-2xl p-6 pb-8 shadow-xl">
                {/* Logo */}
                <img
                    src={images.logoSecond} // Hoặc import images.logoSecond nếu bạn dùng asset
                    alt="BKASIM"
                    className="w-16 h-16 mx-auto mb-4"
                />

                {/* Title */}
                <h2 className="text-center  text-md text-gray-800 mb-6">
                    Trở thành thành viên để sử dụng tính năng
                </h2>

                {/* Description */}
                <p className="text-center text-sm text-gray-600 mb-6">
                    Để đặt lịch Mentoring, bạn cần trở thành thành viên của chương trình.
                    Tính năng sẽ được mở khi hồ sơ của bạn được duyệt.
                </p>

                {/* Actions */}
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="flex-1 mr-2 py-3 rounded-full bg-gray-200 text-gray-700 font-medium"
                    >
                        Từ chối
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 ml-2 py-3 rounded-full bg-blue-600 text-white font-semibold"
                    >
                        Đăng ký
                    </button>
                </div>
            </div>
        </div>
    );
}
