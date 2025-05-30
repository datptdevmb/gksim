import StepperItem from "@/components/Form/StepperItem";
import FormInput from "@/components/Form/FormInput";
import ButtonApp from "@/components/Button/ButtonApp";
import Header from "@/components/Header/Header";
import useAppNavigation from "@/hooks/useNavigation";
import { useState } from "react";
import BookingCard from "@/components/Card/BookingCard";
import Container from "@/components/Container/Container";

const tabs = ["Lịch hẹn mới", "Lịch sử"];

export default function BookingMentoring() {
    const { goToConfirm, goToDetailBooking } = useAppNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const [activeTab, setActiveTab] = useState("Lịch hẹn mới");
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        subject: "",
        time: "",
        confirmNote: "",
    });

    const bookings = [
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Chờ xác nhận", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Đã xác nhận", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Hoàn thành", date: "13/01/2025" },
        { code: "#Abcd35qj", name: "Tên khách hàng A", time: "15:00-15/01/2025", status: "Đã huỷ", date: "13/01/2025" },
    ];

    const steps = [
        { label: "1.Nhập chủ đề", icon: "zi-edit" },
        { label: "2.Nhập thời gian", icon: "zi-edit" },
        { label: "3.Xác nhận thông tin", icon: "zi-clock-1-solid" },
        { label: "4.Xác nhận thông tin", icon: "zi-edit" }, 
    ];

    const handleComplete = () => {

        setIsLoading(true)
        setIsCompleted(true);
        setCurrentStep(steps.length);
    };

    return (

        <div>
            <div className="flex border-b pt-4">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 text-sm font-medium px-4 pb-2 text-center ${activeTab === tab ? "border-b-2 border-[#3993D9] text-blue-600" : "border-b-2 bg-light text-gray-400"}`}
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

                        <div className="flex  flex-row ">

                            <div className="relative flex flex-col items-start ml-[8px]">
                                {
                                    !isCompleted ? (<div> <div className="w-[2px] h-[70px] bg-gray-300"></div>
                                        <div className="w-8 h-[2px] bg-gray-300 ml-[2px]"></div></div>) :
                                        (<div>
                                            <div className="w-[2px] h-[70px] bg-[#3993D9]"></div>
                                            <div className="w-8 h-[2px] bg-[#3993D9]"></div>
                                        </div>)
                                }

                            </div>

                            <div className="flex flex-col">
                                <p className="text-xs text-gray-500 leading-relaxed mb-5">
                                    Quý khách sẽ nhận được thông báo Zalo thông tin đặt lịch, nhân viên sẽ liên lạc lại Quý khách qua SĐT nếu thông tin đặt lịch có sự thay đổi
                                </p>
                                <div className="">
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

                    </div>
                ) : (
                    <div className="px-4 pt-4 space-y-4">
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input type="date" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                                <input type="date" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" />
                            </div>
                            <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                                <option>Theo trạng thái</option>
                                <option>Chờ xác nhận</option>
                                <option>Đã xác nhận</option>
                                <option>Hoàn thành</option>
                                <option>Đã huỷ</option>
                            </select>
                        </div>

                        {bookings.map((b, i) => (
                            <BookingCard onClick={goToDetailBooking} key={i} booking={b} />
                        ))}
                    </div>
                )}
            </Container>
        </div>

    );
}
