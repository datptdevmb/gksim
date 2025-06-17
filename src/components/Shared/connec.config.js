import images from "@/assets/images";

export const wrapper = "text-center px-6 py-12";
export const image = "w-[200px] max-w-[80%] mx-auto mb-6";
export const title = "text-2xl font-bold mb-3";
export const subtitle = "text-base text-gray-600 mb-6";
export const retryButton = "mx-auto";

export const variantClasses = {
    default: {
        image: images.noInternet,
        title: "Mất kết nối",
        subtitle: "Chúng tôi không thể kết nối đến máy chủ. Vui lòng thử lại.",
    },
    timeout: {
        image: images.noInternet,
        title: "Hết thời gian chờ",
        subtitle: "Máy chủ phản hồi quá chậm. Vui lòng kiểm tra mạng hoặc thử lại sau.",
    },
    "no-internet": {
        image: images.noInternet,
        title: "Không có Internet",
        subtitle: "Thiết bị của bạn hiện không có kết nối mạng.",
    },
    "server-unreachable": {
        image: images.noInternet,
        title: "Không thể kết nối máy chủ",
        subtitle: "Máy chủ không phản hồi. Vui lòng thử lại sau ít phút.",
    },
};