import axios from "axios";

export async function getBookingHistory({ fromDate, toDate, status, page = 1, limit = 10 }) {
    try {
        const token = localStorage.getItem("access_token");
        console.log(token)

        const response = await axios.get("https://bkasim.duckdns.org/booking/history", {
            params: {
                fromDate,
                toDate,
                status,
                page,
                limit,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "*/*",
            },
        });

        console.log("Lịch sử booking:", response.data);
        return response.data || [];
    } catch (error) {
        console.error("Lỗi khi gọi lịch sử booking:", error);
        return [];
    }
}

export async function createBooking(data) {
    try {
        const token = localStorage.getItem("access_token");
        const response = await axios.post("https://bkasim.duckdns.org/booking", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Lỗi tạo booking:", err.response?.data || err.message);
        throw err;
    }
}
