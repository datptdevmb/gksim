import axios from "axios";
import UserSession from "@/utils/session";

export async function followUser(targetUserId, body) {
    const token = localStorage.getItem("access_token");

    try {
        const response = await axios.post(
            `https://bkasim.duckdns.org/follows/${targetUserId}`,
            {
                targetRoleId: body.targetRoleId,
                followerRoleId: body.followerRoleId,
            },
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


export async function getFollowRequests(limit = 20, offset = 0) {
  try {
    const token = UserSession.getAccessToken();
    const response = await axios.get("https://bkasim.duckdns.org/follows/received", {
      params: { limit, offset },
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Lỗi lấy yêu cầu follow:", error);
    return [];
  }
}
