import { useState } from "react";

export default function AppointmentForm() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        date: "",
        mentees: []
    });

    const menteeOptions = ["Tất cả", "Nguyễn Thị C", "Nguyễn Thị B"];

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleToggleMentee = (mentee) => {
        setForm((prev) => {
            const selected = prev.mentees.includes(mentee)
                ? prev.mentees.filter((m) => m !== mentee)
                : [...prev.mentees, mentee];
            return { ...prev, mentees: selected };
        });
    };

    const handleSubmit = () => {
        // Call API here
        console.log("Booking data:", form);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
            <div className="flex border-b text-sm">
                <div className="flex-1 py-2 border-b-2 border-blue-500 text-center font-medium">
                    Lịch hẹn mới
                </div>
                <div className="flex-1 py-2 text-center text-gray-400">Lịch sử</div>
            </div>

            <ol className="mt-4 text-sm space-y-5">
                <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-500 mt-1"></span>
                    <div className="flex-1">
                        <p className="font-semibold mb-1">1. Nhập chủ đề</p>
                        <input
                            type="text"
                            placeholder="Nhập chủ đề"
                            value={form.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>
                </li>

                <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-gray-400 mt-1"></span>
                    <div className="flex-1">
                        <p className="font-semibold mb-1">2. Nhập mô tả</p>
                        <input
                            type="text"
                            placeholder="Nhập mô tả"
                            value={form.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>
                </li>

                <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-gray-400 mt-1"></span>
                    <div className="flex-1">
                        <p className="font-semibold mb-1">3. Chọn ngày giờ <span className="text-red-500">*</span></p>
                        <div className="w-full text-blue-500 text-sm bg-gray-100 rounded px-2 py-2">
                            Xem thời gian đặt lịch
                        </div>
                    </div>
                </li>

                <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-gray-400 mt-1"></span>
                    <div className="flex-1">
                        <p className="font-semibold mb-1">4. Chọn Mentee</p>
                        <select
                            className="w-full border rounded px-2 py-1 text-sm mb-2"
                            onChange={(e) => handleToggleMentee(e.target.value)}
                        >
                            <option>Chọn Mentee</option>
                            {menteeOptions.map((mentee) => (
                                <option key={mentee}>{mentee}</option>
                            ))}
                        </select>

                        <div className="space-y-1">
                            {menteeOptions.map((mentee) => (
                                <label
                                    key={mentee}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={form.mentees.includes(mentee)}
                                        onChange={() => handleToggleMentee(mentee)}
                                    />
                                    {mentee}
                                </label>
                            ))}
                        </div>
                    </div>
                </li>
            </ol>

            <p className="text-xs text-gray-500 mt-4">
                Quý khách sẽ nhận được thông báo Zalo thông tin đặt lịch, nhân viên sẽ liên lạc lại Quý khách qua SDT nếu thông tin đặt lịch có sự thay đổi
            </p>

            <button
                onClick={handleSubmit}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded shadow"
            >
                Chốt Đặt lịch
            </button>
        </div>
    );
}
