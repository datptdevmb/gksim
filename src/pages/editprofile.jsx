import Header from "@/components/MainHeader/MainHeader";
import FormInput from "@/components/Form/BaseInput";
import ButtonApp from "@/components/Button/ButtonApp";
import { useState } from "react";
import BaseInput from "@/components/Form/BaseInput";
import Container from "@/components/Container/Container";
import { Select, Avatar } from "zmp-ui";


export default function EditProfilePage() {
    const [gender, setGender] = useState("");
    const [mbti, setMbti] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1E1A85] to-[#3498db] text-white pb-20">
            <div className="px-6 pt-4 space-y-6 max-h-[700px] overflow-y-auto mb-1">
                <div className="bg-white rounded-xl p-4 text-black space-y-3 shadow mb-4" style={{position: "relative", marginTop: "70px", }}>
                <div className="flex justify-center" style={{position: "absolute", top: "-72px", left: "50%", transform: "translateX(-50%)"}}>
                    <div className="relative w-[145px] h-[145px]">
                        <img
                        src="/src/assets/images/697fcfa89392d0d83106ac7ef66efef4967123e8.png"
                        alt="badge"
                        className="absolute inset-0 w-full h-full"
                        draggable={false}
                        />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Avatar
                            src="https://i.pravatar.cc/120"
                            size={110}
                            className="border-4 border-white shadow-lg"
                        />
                        </div>
                    </div>
                </div>
                    <h3 className="text-sm font-semibold text-[#1E1A85]" style={{marginTop: "60px"}}>Thông tin cá nhân</h3>
                    <BaseInput label="Họ và tên" placeholder="Họ và tên" required />
                    <BaseInput label= "Số điện thoại" placeholder="Nhập số điện thoại" required />
                    <BaseInput
                        label="Email"
                        type="email"
                        required
                        placeholder="Nhập email"
                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                    <Select
                        label="Giới tính"
                        placeholder="Chọn giới tính"
                        value={gender}
                        onChange={(value) => setGender(value)}
                        required
                        >
                        <Option value="Nam" title="Nam" />
                        <Option value="Nữ" title="Nữ" />
                        <Option value="Khác" title="Khác" />
                    </Select>

                    <Select
                        label="MBTI/DISC"
                        placeholder="Chọn kết quả MBTI/DISC"
                        value={mbti}
                        onChange={(value) => setMbti(value)}
                        >
                            <Option value="INTJ" title="INTJ" />
                            <Option value="ENFP" title="ENFP" />
                            <Option value="DISC - D" title="DISC - D" />
                            <Option value="DISC - I" title="DISC - I" />
                            <Option value="DISC - S" title="DISC - S" />
                            <Option value="DISC - C" title="DISC - C" />
                    </Select>
                </div>
                <div className="bg-white rounded-xl p-4 text-black space-y-3 shadow">
                    <h3 className="text-sm font-semibold text-[#1E1A85]">Thông tin doanh nghiệp</h3>
                    <BaseInput label="Tên công ty" placeholder="Công ty Cổ phần ABC" />
                    <BaseInput label="Chức vụ" placeholder="Giám đốc điều hành" />
                    <BaseInput label="Kinh nghiệm" placeholder="10 năm kinh nghiệm" />
                </div>
            </div>
            <div className="min-h-screen bg-gradient-to-b from-[#262C6E] to-[#3993D9] pl-[20px] pr-[20px]">
                <ButtonApp
                    title="Lưu"
                    fullWidth
                    gradient={false}
                    rounded
                    size="lg"
                    className="mt-4 bg-white !text-black"
                    onClick={() => alert("Lưu thông tin thành công")}
                />
            </div>
        </div>
    );
}
