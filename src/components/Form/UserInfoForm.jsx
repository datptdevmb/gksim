import { useState } from "react";
import { Page, Button, Select } from "zmp-ui";
import Container from "@/components/Container/Container";
import SectionTitle from "@/components/Form/SectionTitle";
import BaseInput from "@/components/Form/BaseInput";
import BirthDatePicker from "@/pages/booking/BirthDatePicker";
import FormFooterButton from "@/components/Footer/FormFooterButton";

export default function UserInfoForm({ role = "Mentee", onSubmit }) {
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleFocusPhone = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleConfirmModal = () => {
        setShowModal(false);
        console.log("Cho phép truy cập thông tin Zalo");
    };

    return (
        <Page className="flex flex-col bg-gradient-to-b from-[#1E1A85] to-[#3498db] text-white min-h-screen">
            <Container style={{height: "700px"}}>
                <h2 className="text-center text-lg font-semibold mb-1">Trở thành {role}</h2>
                <p className="text-center text-sm mb-6 text-white/80">Nhập thông tin của bạn</p>

                <SectionTitle title="Thông tin cá nhân" />
                <BaseInput label="Họ và tên" required placeholder="Nguyễn Văn A" />
                <BaseInput
                    label="Số điện thoại người nhận"
                    required
                    placeholder="0933209346"
                    type="tel"
                    onFocus={handleFocusPhone}
                />
                <BaseInput label="Email" placeholder="Nhập địa chỉ email" type="email" />

                <BirthDatePicker
                    label="Ngày sinh"
                    value={birthDate}
                    onChange={(val) => setBirthDate(val)}
                />

                <Select
                    label="Giới tính"
                    placeholder="Chọn giới tính"
                    value={gender}
                    onChange={val => setGender(val)}
                    required
                    options={[
                        { value: "Nam", label: "Nam" },
                        { value: "Nữ", label: "Nữ" },
                        { value: "Khác", label: "Khác" },
                    ]}
                />

                <SectionTitle title="Thông tin doanh nghiệp" />
                <BaseInput label="Tên công ty" placeholder="Nhập tên công ty" />
                <BaseInput label="Chức vụ" placeholder="Nhập chức vụ" />
            </Container>
            <FormFooterButton onClick={onSubmit} />
        </Page>
    );
}
