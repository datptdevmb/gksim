
import axios from "axios";
import apiUrl from "@/assets/api";
import UserSession from "@/utils/session";

export async function getUserInfor(userId) {
    try {
        const token = localStorage.getItem("access_token");
        if (!userId) throw new Error("Thiếu userId");

        const url = apiUrl.getUserInf.replace(":id", userId);

        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Kết quả gọi API getUserInfor:", res.data);
        return res.data; // object user
    } catch (error) {
        console.error("Lỗi gọi API getUserInfor:", error.response?.data || error);
        return null;
    }
}


export async function fetchUsers(role, search) {
    try {
        const res = await axios.get(apiUrl.getUsers, {
            params: {
                role: role === "all" ? undefined : role,
                search: search || undefined,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Lỗi gọi API fetchUsers:", error);
        return [];
    }
}

export async function regisZl(data) {
    try {
        const res = await axios.post(apiUrl.regisZl, data);
        console.log("Kết quả đăng ký Zalo:", res.data);

        // Chỉ lưu zaloId nếu message là \"Đăng ký thành công\"
        if (res.data.message === "Đăng ký thành công, vui lòng chờ admin duyệt!" && data.zaloId) {
            localStorage.setItem("zaloId", data.zaloId);
        }

        return res.data;
    } catch (error) {
        console.log("Lỗi gọi API regisZl:", error.response.data);
        throw error;
    }
}


export async function loginZalo(zaloId) {
    if (!zaloId) throw new Error("Thiếu zaloId");

    try {
        const res = await axios.post(apiUrl.loginZalo, { zaloId });

        const { access_token, userData } = res.data;

        const payload = {
            zaloId,
            token: access_token,
            userId: userData?.id,
            status: userData?.status,
        };

        UserSession.setSession(payload)
        console.log("Kết quả đăng nhập Zalo:", res.data);

        return userData;
    } catch (error) {
        console.error("Lỗi đăng nhập Zalo:", error.response?.data || error);
        throw error;
    }
}





