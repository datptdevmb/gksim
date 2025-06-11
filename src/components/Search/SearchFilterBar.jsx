import { memo } from "react";
import SelectApp from "../Select/SelectApp";
import InputApp from "../Input/InputApp";


const optionsSearch = [
      { value: "", label: "Tất cả" },
      { value: "mentee", label: "Mentee" },
      { value: "mentor", label: "Mentor" },
      { value: "followed", label: "Đã follow" }
];


function SearchFilterBar({ searchValue, filterValue, onSearch, onFilterChange }) {
      return (
            <div className="px-4 py-2 bg-white flex flex-col gap-2">
                  <InputApp
                        placeholder="Tìm kiếm"
                        value={searchValue}
                        onChange={(e) => onSearch(e.target.value)}
                  />
                  <SelectApp
                        placeholder="Lọc theo vai trò"
                        value={filterValue}
                        onChange={onFilterChange}
                        options={optionsSearch}
                        size="sm"
                        color="gray"
                  />
            </div>
      );
}

export default memo(SearchFilterBar);
