import { useEffect, useState } from "react";
import AppHeader from "@/components/MainHeader/MainHeader";
import SearchFilterBar from "@/components/Search/SearchFilterBar";
import UserCard from "@/components/Card/UserCard";
import Container from "@/components/Container/Container";
import { fetchUsers } from "../services/auth/index";
import { Select } from "zmp-ui";

export default function SearchPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true); // Bắt đầu loading
            const data = await fetchUsers(activeTab, searchTerm);
            setUsers(data);
            setLoading(false); // Kết thúc loading
        };

        loadData();
    }, [activeTab, searchTerm]);

    return (
       <>
            <SearchFilterBar
                onSearch={(val) => setSearchTerm(val)}
                onFilterChange={(val) => setActiveTab(val)}
            />
             <Container>
                <div className="flex justify-around mt-2 text-sm font-semibold bg-white rounded-t-lg overflow-hidden">
                    {[
                        { label: "Tất cả", value: "all" },
                        { label: "Danh sách Mentor", value: "mentor" },
                        { label: "Danh sách Mentee", value: "mentee" },
                    ].map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-2 py-2 ${
                                activeTab === tab.value
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {loading ? (
                    <div className="flex justify-center py-8">
                        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-b-lg overflow-hidden">
                        {users.length > 0 ? (
                            users.map((user, idx) => (
                                <UserCard
                                    key={user.id || idx}
                                    avatar={user.avatar || "/avatar.png"}
                                    name={user.name}
                                    profession={user.profession || "Nghề nghiệp"}
                                    onFavorite={() => console.log("Yêu thích", user.id)}
                                />
                            ))
                        ) : (
                            <div className="text-center py-6 text-gray-500">
                                Không tìm thấy người dùng nào.
                            </div>
                        )}
                    </div>
            )}
            </Container>
       </>
    );
}
