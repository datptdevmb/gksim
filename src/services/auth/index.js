
import axios from "axios";
import apiUrl from "@/assets/api";
import UserSession from "@/utils/session";
import instance from "@/utils/axiosIntance";
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



export async function fetchUsers(role = "", name = "", userId = null) {
    try {
        const token = localStorage.getItem("access_token");

        const params = {};

        if (role && role !== "all") params.role = role;
        if (name) params.name = name;
        if (role === "followed" && userId) params.userId = userId;

        const response = await instance.get("https://bkasim.duckdns.org/users", {
            params,
            headers: {
                accept: "*/*",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Kết quả gọi API fetchUsers:", response.data);
        return response.data.data || [];
    } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        return [];
    }
}




export async function regisZl(data) {
    try {
        const res = await axios.post(apiUrl.regisZl, data);
        console.log("Kết quả đăng ký Zalo:", res.data);


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
        const res = await instance.post(apiUrl.loginZalo, { zaloId });

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



export async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await axios.post(`${apiUrl}/auth/refresh`, {
        refresh_token: refreshToken,
    });
    return response.data.access_token;
}


export async function fetchUserById(userId) {
    try {
        const response = await axiosInstance.get(`${apiUrl.getUserInf.replace(":id", userId)}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        return null;
    }
}

export async function followUser(userId) {
    const token = localStorage.getItem("access_token");

    try {
        const response = await axios.post(
            `https://bkasim.duckdns.org/follows/${userId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi follow người dùng:", error);
        throw error;
    }
}

export const updateUserInfo = async (userId, userData) => {
    const url = apiUrl.updateUser.replace(":id", userId);
    const response = await axios.put(url, userData);
    return response.data;
};





