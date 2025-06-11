import { useEffect, useRef, useState } from "react";
import { fetchUsers } from "@/services/auth";
import { followUser } from "@/services/follow/follow";
import UserSession from "@/utils/session";

export default function useUserSearch() {
    const [activeTab, setActiveTab] = useState(""); // "", "mentor", "mentee", "followed"
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const debounceTimeout = useRef(null);
    const userId = UserSession.getUserId();

    const loadUsers = async (role, name) => {
        setLoading(true);
        const data = await fetchUsers(role, name, userId);

        let filtered = data.map((user) => ({
            ...user,
            isFavorite: user.isFavorite ?? false,
        }));

        if (role === "followed") {
            filtered = filtered.filter((user) => user.followStatus === true);
        }

        setUsers(filtered);
        setLoading(false);
    };

    useEffect(() => {
        loadUsers(activeTab, searchTerm);
    }, [activeTab, searchTerm]);

    const handleSearch = (val) => {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            setSearchTerm(val);
        }, 300);
    };

    const handleToggleFavorite = async (userId, isFavorite, targetRoleId) => {
        try {
            if (!isFavorite) {
                const followerRoleId = UserSession.getUserId();
                await followUser(userId, {
                    targetRoleId,
                    followerRoleId,
                });
            }

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId
                        ? { ...user, isFavorite: !user.isFavorite }
                        : user
                )
            );
        } catch (error) {
            console.error("Không thể follow:", error);
        }
    };
    return {
        activeTab,
        setActiveTab,
        searchTerm,
        handleSearch,
        users,
        loading,
        handleToggleFavorite,
    };
}
