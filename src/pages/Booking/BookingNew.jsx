import React, { useState, useEffect } from "react";
import { fetchUsers } from "@/services/auth";
import { createBooking } from "@/services/booking";
import UserSession from "@/utils/session";

// 🔹 Đây là role của người dùng hiện tại (nên lấy từ token hoặc context)
const userRoles = ["mentor", "mentee"]; // hoặc chỉ ["mentee"], ["mentor"]

export default function BookingNew() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedMentees, setSelectedMentees] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState("");
    const [activeRole, setActiveRole] = useState(userRoles.length === 1 ? userRoles[0] : "");

    const [menteesList, setMenteesList] = useState([]);
    const [mentorsList, setMentorsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // 🔹 Giả lập thông tin người đăng nhập (nên thay bằng context hoặc decode token)
    const currentUser = {
        id: UserSession.getUserId(),
        role: activeRole,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mentees, mentors] = await Promise.all([
                    fetchUsers("mentee"),
                    fetchUsers("mentor"),
                ]);
                setMenteesList(mentees);
                setMentorsList(mentors);
            } catch (err) {
                console.error("Lỗi khi tải danh sách người dùng:", err);
                alert("Không thể tải danh sách người dùng.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Vui lòng nhập chủ đề.";
        if (!description.trim()) newErrors.description = "Vui lòng nhập mô tả.";
        if (!selectedDate) newErrors.date = "Vui lòng chọn ngày giờ.";
        if (activeRole === "mentor" && selectedMentees.length === 0)
            newErrors.participant = "Chọn ít nhất một mentee.";
        if (activeRole === "mentee" && !selectedMentor)
            newErrors.participant = "Chọn một mentor.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCheckboxChange = (menteeId) => {
        setSelectedMentees((prev) =>
            prev.includes(menteeId)
                ? prev.filter((id) => id !== menteeId)
                : [...prev, menteeId]
        );
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            let participantInfo = [];

            // ➕ Thêm chính người tạo vào
            participantInfo.push({
                userId: currentUser.id,
                role: currentUser.role,
            });

            if (activeRole === "mentor") {
                const mentees = selectedMentees.map((id) => ({
                    userId: id,
                    role: "mentee",
                }));
                participantInfo.push(...mentees);
            }

            if (activeRole === "mentee") {
                participantInfo.push({
                    userId: selectedMentor,
                    role: "mentor",
                });
            }

            const payload = {
                bookingTitle: title,
                bookingDesc: description,
                schedulingTime: new Date(selectedDate).toISOString(),
                participantInfo,
            };

            console.log(payload)
            await createBooking(payload);
            alert("Đặt lịch thành công!");

            // Reset form
            setTitle("");
            setDescription("");
            setSelectedDate("");
            setSelectedMentor("");
            setSelectedMentees([]);
            setErrors({});
        } catch (error) {
            alert("Lỗi khi tạo lịch: " + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="text-center py-6 text-gray-500">Đang tải dữ liệu...</div>;

    return (
        <div>
            {userRoles.length > 1 && (
                <div className="mb-4">
                    <label className="font-semibold block mb-1">Chọn vai trò đặt lịch</label>
                    <div className="flex gap-4">
                        {userRoles.map((role) => (
                            <label key={role} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value={role}
                                    checked={activeRole === role}
                                    onChange={() => setActiveRole(role)}
                                />
                                {role === "mentor" ? "Mentor" : "Mentee"}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {activeRole && (
                <>
                    <div className="mb-3">
                        <label className="font-semibold block">1. Nhập chủ đề</label>
                        <input
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="font-semibold block">2. Nhập mô tả</label>
                        <textarea
                            className="w-full border px-3 py-2 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="font-semibold block">3. Chọn ngày giờ *</label>
                        <input
                            type="datetime-local"
                            className="w-full border px-3 py-2 rounded"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="font-semibold block">4. Người tham gia</label>

                        {activeRole === "mentor" && (
                            <div className="space-y-1 mt-2">
                                {menteesList.map((mentee) => (
                                    <div key={mentee.id} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedMentees.includes(mentee.id)}
                                            onChange={() => handleCheckboxChange(mentee.id)}
                                        />
                                        <span>{mentee.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeRole === "mentee" && (
                            <select
                                className="w-full border px-3 py-2 rounded mt-2"
                                value={selectedMentor}
                                onChange={(e) => setSelectedMentor(e.target.value)}
                            >
                                <option value="">-- Chọn Mentor --</option>
                                {mentorsList.map((mentor) => (
                                    <option key={mentor.id} value={mentor.id}>
                                        {mentor.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {errors.participant && (
                            <p className="text-red-500 text-sm mt-1">{errors.participant}</p>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded"
                    >
                        Chốt Đặt lịch
                    </button>

                    <p className="text-xs text-gray-500 mt-2">
                        Quý khách sẽ nhận được thông báo Zalo khi đặt lịch. Nhân viên sẽ liên hệ lại nếu cần thay đổi thông tin.
                    </p>
                </>
            )}
        </div>
    );
}
