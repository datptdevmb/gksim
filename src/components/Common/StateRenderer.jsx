import { memo } from "react";

/**
 * StateRenderer component
 *
 * Hiển thị các trạng thái khác nhau cho việc tải dữ liệu:
 * - loading
 * - error
 * - empty
 * - content
 *
 * Props:
 * @param {boolean} loading - Có đang tải không
 * @param {any} data - Dữ liệu nhận được
 * @param {string | null} error - Thông báo lỗi (nếu có)
 * @param {string} emptyText - Thông báo khi không có dữ liệu
 * @param {string} loadingText - Thông báo khi đang tải
 * @param {ReactNode} children - Nội dung hiển thị khi có data
 */
function StateRenderer({
    loading = false,
    data,
    error = null,
    emptyText = "Không có dữ liệu.",
    loadingText = "Đang tải nội dung...",
    children,
}) {
    if (loading) {
        return <p className="text-center text-sm text-gray-400 p-4">{loadingText}</p>;
    }

    if (error) {
        return <p className="text-center text-sm text-red-500 p-4">{error}</p>;
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <p className="text-center text-sm text-gray-400 p-4">{emptyText}</p>;
    }

    return <>{children}</>;
}

export default memo(StateRenderer);
