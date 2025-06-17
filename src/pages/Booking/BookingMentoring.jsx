import React, { useState } from "react";
import BookingNew from "./BookingNew";
import BookingHistory from "./BookingHistory";

const tabs = ["Lịch hẹn mới", "Lịch sử"];

export default function BookingTabs() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="mx-2 p-4 bg-white shadow rounded">
            <div className="flex justify-around mb-4 border-b">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`py-2 px-4 ${activeTab === tab
                            ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Lịch hẹn mới" && <BookingNew />}
            {activeTab === "Lịch sử" && <BookingHistory />}
        </div>
    );
}
