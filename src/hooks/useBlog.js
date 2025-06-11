import { useEffect, useState } from "react";
import { getCategories, getNewsByCategory } from "@/services/News";
import { useDebounce } from "@/hooks/useDebounce"; // optional custom hook
import useAppNavigation from "@/hooks/useNavigation";

export default function useBlog() {
    const { goToNewsDetailPage } = useAppNavigation();

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchText, setSearchText] = useState("");
    const debouncedSearch = useDebounce(searchText, 500);

    // Fetch categories once
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await getCategories();
                if (response?.data) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }
        fetchCategories();
    }, []);

    // Fetch news on category/search change
    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const response = await getNewsByCategory(activeCategory, debouncedSearch);
                if (response?.data) {
                    setBlogs(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, [activeCategory, debouncedSearch]);

    const handleClick = (id) => goToNewsDetailPage(id);

    return {
        categories,
        activeCategory,
        setActiveCategory,
        blogs,
        loading,
        searchText,
        setSearchText,
        handleClick,
    };
}
