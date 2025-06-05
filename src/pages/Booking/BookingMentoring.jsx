import { useCallback, useEffect, useState } from "react";
import StepperItem from "@/components/Form/StepperItem";
import ButtonApp from "@/components/Button/ButtonApp";
import BookingCard from "@/components/Card/BookingCard";
import Container from "@/components/Container/Container";
import useAppNavigation from "@/hooks/useNavigation";
import { getBookingHistory } from "@/services/booking";

const tabs = ["Lịch hẹn mới", "Lịch sử"];
const today = new Date().toISOString().split("T")[0];

export default function BookingMentoring() {
    const { goToDetailBooking } = useAppNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [historyBookings, setHistoryBookings] = useState([]);

    const [historyParams, setHistoryParams] = useState({
        fromDate: today,
        toDate: today,
        status: "",
        page: 1,
        limit: 10,
    });

    const steps = [
        { label: "1.Nhập chủ đề", icon: "zi-edit" },
        { label: "2.Nhập thời gian", icon: "zi-edit" },
        { label: "3.Xác nhận thông tin", icon: "zi-clock-1-solid" },
        { label: "4.Xác nhận thông tin", icon: "zi-edit" },
    ];

    const statusMap = {
        "Chờ xác nhận": "pending",
        "Đã xác nhận": "confirmed",
        "Hoàn thành": "completed",
        "Đã huỷ": "cancelled",
    };

    const fetchHistory = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getBookingHistory(historyParams);
            setHistoryBookings(data);
        } finally {
            setIsLoading(false);
        }
    }, [historyParams]);

    useEffect(() => {
        if (activeTab === "Lịch sử") {
            fetchHistory();
        }
    }, [activeTab, fetchHistory]);

    const handleComplete = () => {
        setIsLoading(true);
        setIsCompleted(true);
        setCurrentStep(steps.length);
    };

    return (
        <div>
            {/* Tabs */}
            <div className="flex border-b pt-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 text-sm font-medium px-4 pb-2 text-center ${activeTab === tab
                                ? "border-b-2 border-[#3993D9] text-blue-600"
                                : "border-b-2 bg-light text-gray-400"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <Container bg="light">
                {activeTab === "Lịch hẹn mới" ? (
                    <div className="pt-5 px-4">
                        {steps.map((step, index) => (
                            <StepperItem
                                key={index}
                                icon={step.icon}
                                label={step.label}
                                isActive={!isCompleted && index === currentStep}
                                isDone={isCompleted || index < currentStep}
                                disabled={isCompleted}
                                onClick={() => setCurrentStep(index)}
                            />
                        ))}

                        <div className="flex flex-row">
                            {/* Line indicator */}
                            <div className="relative flex flex-col items-start ml-[8px]">
                                <div
                                    className={`w-[2px] h-[70px] ${isCompleted ? "bg-[#3993D9]" : "bg-gray-300"
                                        }`}
                                />
                                <div
                                    className={`w-8 h-[2px] ml-[2px] ${isCompleted ? "bg-[#3993D9]" : "bg-gray-300"
                                        }`}
                                />
                            </div>

                            {/* Info + Button */}
                            <div className="flex flex-col">
                                <p className="text-xs text-gray-500 leading-relaxed mb-5">
                                    Quý khách sẽ nhận được thông báo Zalo thông tin đặt lịch, nhân
                                    viên sẽ liên lạc lại nếu có thay đổi.
                                </p>
                                <ButtonApp
                                    title="Chốt Đặt lịch"
                                    fullWidth
                                    rounded
                                    loading={isLoading}
                                    disabled={isLoading}
                                    gradient
                                    size="md"
                                    onClick={handleComplete}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 pt-4 space-y-4">
                        {/* Filters */}
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                    value={historyParams.fromDate}
                                    onChange={(e) =>
                                        setHistoryParams((prev) => ({
                                            ...prev,
                                            fromDate: e.target.value,
                                        }))
                                    }
                                />
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                    value={historyParams.toDate}
                                    onChange={(e) =>
                                        setHistoryParams((prev) => ({
                                            ...prev,
                                            toDate: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <select
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                                onChange={(e) =>
                                    setHistoryParams((prev) => ({
                                        ...prev,
                                        status: statusMap[e.target.value] || "",
                                    }))
                                }
                            >
                                <option>Theo trạng thái</option>
                                {Object.keys(statusMap).map((label) => (
                                    <option key={label}>{label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Booking List */}
                        {isLoading ? (
                            <div className="text-center text-gray-400">
                                Đang tải dữ liệu...
                            </div>
                        ) : historyBookings.length > 0 ? (
                            historyBookings.map((b, i) => (
                                <BookingCard key={i} booking={b} onClick={goToDetailBooking} />
                            ))
                        ) : (
                            <div className="text-center text-gray-400">
                                Không có lịch sử đặt lịch
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}
