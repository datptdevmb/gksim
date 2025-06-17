
import { useQuery } from "@tanstack/react-query";
import { fetchUserById, fetchUsers } from "@/services/auth";

export const useUsersQuery = (role, searchTerm) => {
    return useQuery({
        queryKey: ["users", role, searchTerm],
        queryFn: () => {
            const token = localStorage.getItem("access_token");
            return fetchUsers(role, name);
        },
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,
    });
};


export const useGetUserById = (id) => {

    return useQuery(
        {
            queryKey: ["user", id],
            queryFn: () => {
                return fetchUserById(id)
            },
            enabled: !!id,
            staleTime: 1000 * 60 * 5,
            keepPreviousData: true,

        }
    )
}
