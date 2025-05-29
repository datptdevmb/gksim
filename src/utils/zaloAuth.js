import { authorize } from "zmp-sdk/apis";

/**
 * Hàm xử lý cấp quyền Zalo
 * @param {Function} onSuccess - Callback nếu authorize thành công
 * @param {Function} onFail - Callback nếu authorize thất bại
 */
export function handleAuthorize(onSuccess, onFail) {
    authorize({
        scopes: ["scope.userInfo", "scope.userPhonenumber"],
        success: onSuccess,
        fail: (err) => {
            console.warn("Không được cấp quyền:", err);
            alert("Bạn cần cấp quyền để tiếp tục sử dụng tính năng này.");
            if (onFail) onFail(err);
        }
    });
}
