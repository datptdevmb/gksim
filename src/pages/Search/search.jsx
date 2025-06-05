import { useEffect, useState } from "react";
import SearchFilterBar from "@/components/Search/SearchFilterBar";
import UserCard from "@/components/Card/UserCard";
import Container from "@/components/Container/Container";
import { fetchUsers } from "../../services/auth/index";
import LoadingOrList from "@/components/Shared/LoadingOrList";

export default function SearchPage() {
    const [activeTab, setActiveTab] = useState("mentor");
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchUsers(activeTab, searchTerm);
            setUsers(data);
            setLoading(false);
        };

        loadData();
    }, [activeTab, searchTerm]);

    return (
        <Container>

            <SearchFilterBar
                onSearch={(val) => setSearchTerm(val)}
                onFilterChange={(val) => setActiveTab(val)}
            />


            <LoadingOrList
                isLoading={loading}
                data={users}
                loadingText="Đang tải dữ liệu người dùng..."
                emptyText="Không tìm thấy người dùng nào."
                renderItem={(user, idx) => (
                    <UserCard
                        key={user.id || idx}
                        avatar={user.avatar || "/avatar.png"}
                        name={user.name}
                        profession={user.profession || "Nghề nghiệp"}
                        onFavorite={() => console.log("Yêu thích", user.id)}
                    />
                )}
            />

        </Container>
    );
}
