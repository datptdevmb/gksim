import { useState } from "react";
import Header from "@/components/Header/Header";
import FormInput from "@/components/Form/FormInput";
import ButtonApp from "@/components/Button/ButtonApp";
import Container from "@/components/Container/Container";

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        mbti: "",
        avatar: "https://i.pravatar.cc/120",
    });

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        console.log("Thông tin người dùng:", formData);
        alert("Lưu thông tin thành công");
    };

    return (
        <Container>
            <div className="flex justify-center mt-4">
                <img
                    src={formData.avatar}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    alt="avatar"
                />
            </div>

            <div className="px-4 pt-4 space-y-6">
                <div className="bg-white rounded-xl p-4 text-black space-y-3 shadow">
                    <h3 className="text-sm font-semibold text-[#1E1A85]">Thông tin cá nhân</h3>

                    <FormInput
                        label="Họ và tên"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={handleChange("name")}
                        required
                    />

                    <FormInput
                        label="Số điện thoại"
                        placeholder="0933209346"
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        required
                    />

                    <FormInput
                        label="Email"
                        type="email"
                        placeholder="nguyenvana@gmail.com"
                        value={formData.email}
                        onChange={handleChange("email")}
                    />

                    <div>
                        <label className="text-sm font-medium block mb-1">Giới tính</label>
                        <select
                            className="w-full px-3 py-2 rounded border border-gray-300 text-sm text-black"
                            value={formData.gender}
                            onChange={handleChange("gender")}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">MBTI/DISC</label>
                        <select
                            className="w-full px-3 py-2 rounded border border-gray-300 text-sm text-black"
                            value={formData.mbti}
                            onChange={handleChange("mbti")}
                        >
                            <option value="">Chọn kết quả MBTI/DISC</option>
                            <option>INTJ</option>
                            <option>ENFP</option>
                            <option>DISC - D</option>
                            <option>DISC - I</option>
                            <option>DISC - S</option>
                            <option>DISC - C</option>
                        </select>
                    </div>
                </div>

                <ButtonApp
                    title="Lưu"
                    fullWidth
                    gradient
                    rounded
                    size="lg"
                    onClick={handleSubmit}
                />
            </div>
        </Container>
    );
}
