import { Icon, Input, Select } from "zmp-ui";
const { Search } = Input;

export default function SearchFilterBar({ onSearch, onFilterChange }) {
    return (
        <div className="px-4 py-2 bg-white flex flex-col gap-2">
            <Search
            placeholder="Tìm kiếm"
            onChange={(e) => onSearch(e.target.value)}
            icon={<Icon icon="zi-search" style={{ color: "#0069F3" }} />}
            />
            <Select
                defaultValue="1"
                onChange={(e) => onFilterChange(e.target.value)}
                >
                <Option
                    title="Tất cả"
                    value="1"
                />
                <Option
                    title="Mentor"
                    value="2"
                />
                <Option
                    title="Mentee"
                    value="3"
                />
            </Select>
        </div>
    );
}
