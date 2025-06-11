import useUserSearch from "@/hooks/useUserSearch";
import SearchFilterBar from "@/components/Search/SearchFilterBar";
import UserCard from "@/components/Card/User/UserCard";
import Container from "@/components/Container/Container";
import LoadingOrList from "@/components/Shared/LoadingOrList";
import ButtonApp from "@/components/Button/ButtonApp";

export default function SearchPage() {
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    handleSearch,
    users,
    loading,
    handleToggleFavorite,
  } = useUserSearch();

  return (
    <Container>
      <SearchFilterBar
        searchValue={searchTerm}
        filterValue={activeTab}
        onSearch={handleSearch}
        onFilterChange={setActiveTab}
      />
      <LoadingOrList
        isLoading={loading}
        data={users}
        loadingText="Đang tải dữ liệu người dùng..."
        emptyText="Không tìm thấy người dùng nào."
        renderItem={(user) => (
          <UserCard
            {...user}
            key={user.id}
            action={
              <ButtonApp
                title={user.isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
                size="sm"
                rounded
                variant={user.isFavorite ? "solid" : "outline"}
                onClick={() =>
                  handleToggleFavorite(user.id, user.isFavorite, user.roleId)
                }
              />
            }
          />
        )}
      />
    </Container>
  );
}
