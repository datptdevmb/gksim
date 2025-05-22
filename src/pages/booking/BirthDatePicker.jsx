import { DatePicker, Icon } from "zmp-ui";
import { useState } from "react";

export default function BirthDatePicker({ label, value, onChange }) {
    console.log(label);

    return (
        <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">
                {label}
            </label>
            <DatePicker
                placeholder="Chọn ngày sinh"
                type="date"
                value={value}
                onChange={onChange}
                max={new Date().toISOString().split("T")[0]}
                className="bg-white rounded px-4 py-2 text-black w-full"
            />
        </div>
    );
}
