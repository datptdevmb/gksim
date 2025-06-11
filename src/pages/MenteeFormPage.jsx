import { useState } from "react";
import Header from "@/components/Header/AppHeader";
import FormInput from "@/components/Form/FormInput";
import SectionTitle from "@/components/Form/SectionTitle";
import FormFooterButton from "@/components/Footer/FormFooterButton";
import ZaloConsentModal from "@/components/Modal/ZaloConsentModal";
import Container from "@/components/Container/Container";
import { authorize, getUserInfo } from "zmp-sdk/apis"; // ✅ đúng module

export default function MenteeFormPage() {
    const [gender, setGender] = useState("");
    const [showConsentModal, setShowConsentModal] = useState(false);


    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        dob: "",
        company: "",
        position: "",
    });

    const handleSubmit = () => {
        alert("Gửi thành công!");
    };

    const handleFocusPhone = () => {
        authorize({
            scopes: ["scope.userInfo", "scope.userPhonenumber"],
            success: (data) => {
                console.log("Cấp quyền thành công:", data);
                // getUserInfo({
                //     success: (res) => {
                //         const { name, phone } = res.userInfo;
                //         console.log("Thông tin người dùng:", res.userInfo);
                //         setFormData((prev) => ({
                //             ...prev,
                //             name: name || "",
                //             phone: phone || "",
                //         }));

                //         setShowConsentModal(true);
                //     },
                //     fail: (err) => {
                //         console.error("Lỗi getUserInfo:", err);
                //     },
                // });
            },
            fail: (err) => {
                console.error("Từ chối cấp quyền:", err);
            },
        });
    };



    const handleInputChange = (field) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    return (
        <>
            <Container h-full>

                <h2 className="text-center text-lg font-semibold mb-1">Trở thành Mentee</h2>
                <p className="text-center text-sm mb-6">Nhập thông tin của bạn</p>

                <SectionTitle title="Thông tin cá nhân" />
                <FormInput
                    label="Họ và tên"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={handleInputChange("name")}
                />
                <FormInput
                    label="Số điện thoại người nhận"
                    required
                    placeholder="0933209346"
                    type="tel"
                    onFocus={handleFocusPhone}
                    value={formData.phone}
                    onChange={handleInputChange("phone")}
                />
                <FormInput
                    label="Email"
                    placeholder="Nhập địa chỉ email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                />
                <FormInput
                    label="Ngày sinh"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange("dob")}
                />

                <div className="mb-4">
                    <label className="block mb-1 text-sm">Giới tính</label>
                    <select
                        className="w-full px-4 py-4 rounded bg-white text-black focus:outline-none"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <SectionTitle title="Thông tin doanh nghiệp" />
                <FormInput
                    label="Tên công ty"
                    placeholder="Nhập tên công ty"
                    value={formData.company}
                    onChange={handleInputChange("company")}
                />
                <FormInput
                    label="Chức vụ"
                    placeholder="Nhập chức vụ"
                    value={formData.position}
                    onChange={handleInputChange("position")}
                />

            </Container>
            <FormFooterButton onClick={handleSubmit} />
        </>


    );
}
