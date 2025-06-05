import axiosInstance from "@/utils/axiosInstance";
import API_URL from "@/assets/constant/api.contant";

export const getFeaturedBlogs = async () => {
    const res = await axiosInstance.get(API_URL.getFeatured);
    return res.data;
};

export const getBlogs = async (categoryId, search = "") => {
    try {
        const res = await axiosInstance.get(API_URL.getBlogByCate, {
            params: {
                categoryId: categoryId === "all" ? undefined : categoryId,
                search: search || undefined,
            },
        });
        console.log("Kết quả gọi API getBlogs:", res.data);
        return res.data;
    } catch (error) {
        console.error("Lỗi getBlogs:", error);
        return [];
    }
}


export const getBlogById = async (id) => {
    try {
        const res = await axios.get(API_URL.getBlogById.replace("{id}", id));
        return res.data;
    } catch (error) {
        console.error("Lỗi getBlogById:", error);
        return null;
    }
}