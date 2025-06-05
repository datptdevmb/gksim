import { useQuery } from "@tanstack/react-query";
import { getFeaturedBlogs } from "@/services/blog";

export const useFetchBlog = () => {
    
    return useQuery({
        queryKey: ["featured-blogs"],
        queryFn: getFeaturedBlogs,
        staleTime: 1000 * 60 * 5, 
        cacheTime: 1000 * 60 * 10, 
        retry: 1,
    });
};
