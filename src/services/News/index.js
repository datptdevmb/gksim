import apiUrl from "@/assets/api"
import axios from "axios"

export async function getNews() {
    try {
        const news = await axios.get(apiUrl.getFeatured);
        console.log(news.data)
        return news.data

    } catch (error) {
        console.log(error)
    }
}

export async function getCategories() {
    try {
        const news = await axios.get(apiUrl.getCategories);
        console.log(news.data)
        return news.data

    } catch (error) {
        console.log(error)
    }
}
export const getNewsByCategory = async (categoryId, search = "") => {
    try {
        const res = await axios.get(apiUrl.getNewsByCategory, {
            params: {
                categoryId: categoryId === "all" ? undefined : categoryId,
                search: search || undefined,
            },
        });
        console.log("Kết quả gọi API getNewsByCategory:", res.data);
        return res.data;
    } catch (error) {
        console.error("Lỗi getNewsByCategory:", error);
        return [];
    }
};

export const getBlogById = async (id) => {
    try {
        const res = await axios.get(apiUrl.getBlogById.replace("{id}", id));
        return res.data;
    } catch (error) {
        console.error("Lỗi getBlogById:", error);
        return null;
    }
}


