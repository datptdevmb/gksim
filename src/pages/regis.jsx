import { useEffect, useState } from "react";
import { authorize, getUserInfo, getUserID, getPhoneNumber } from "zmp-sdk/apis";
import { regisZl } from "@/services/auth";
import {
    FiUser,
    FiPhone,
    FiMail,
    FiCalendar,
    FiUserCheck,
    FiBriefcase,
    FiUserPlus
} from "react-icons/fi";
import { validateStep1, validateStep2 } from "../utils/validateForm";

export default function RegisPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        gender: "",
        email: "",
        dob: "",
        company: "",
        position: "",
        roles: [],
        zaloId: "434723783325452"
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getUserInfo({
            success: (data) => {
                const user = data.userInfo;
                setFormData((prev) => ({
                    ...prev,
                    fullName: user.name || "",
                    gender: user.gender || ""
                }));
            },
            fail: (err) => {
                console.warn("Không lấy được thông tin người dùng:", err);
            }
        });

        getPhoneNumber({
            success: (data) => {
                setFormData((prev) => ({
                    ...prev,
                    phone: data.phoneNumber || ""
                }));
            },
            fail: (err) => {
                console.warn("Không lấy được số điện thoại:", err);
            }
        });

        getUserID({
            success: (data) => {
                const zaloId = data;
                console.log("Zalo ID:", zaloId);
                setFormData((prev) => ({
                    ...prev,
                    zaloId: zaloId || "434723783325452"
                }));
            },
            fail: (err) => {
                console.warn("Không lấy được User ID:", err);
            }
        });
    }, []);

    const submitRegister = async () => {
        const payload = {
            zaloId: formData.zaloId,
            name: formData.fullName,
            avatar: "",
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            job: formData.position,
            fieldOfStudy: "",
            company: formData.company,
            roles: formData.roles,
        };
        console.log("Payload đăng ký:", payload);

        try {
            await regisZl(payload);
            setStep(3);
        } catch (err) {
            console.log("Lỗi khi đăng ký:", err);

            throw err;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        setFormData((prev) => {
            const roles = new Set(prev.roles || []);
            checked ? roles.add(value) : roles.delete(value);
            return { ...prev, roles: Array.from(roles) };
        });
    };

    const nextStep = async () => {
        const validationErrors = step === 1 ? validateStep1(formData) : validateStep2(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        if (step === 2) {
            try {
                await submitRegister();
            } catch (err) {
                return;
            }
        } else {
            setStep((s) => s + 1);
        }
    };

    const prevStep = () => setStep((s) => s - 1);

    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden ">
            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="relative flex items-center justify-between mb-6">
                    {["Tài khoản", "Doanh nghiệp", "Hoàn tất"].map((label, index) => {
                        const current = index + 1;
                        return (
                            <div key={index} className="flex flex-col items-center w-1/3 relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white z-10 ${step >= current ? "bg-gradient-to-b from-[#1E1A85] to-[#3498db]" : "bg-gray-300"}`}>{current}</div>
                                <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
                            </div>
                        );
                    })}
                    <div className="absolute top-5 left-[16.66%] w-2/3 h-1 bg-gray-300 z-0">
                        <div className={`h-full transition-all duration-300 ${step >= 3 ? "w-full bg-green-500" : step === 2 ? "w-1/2 bg-indigo-600" : "w-[10%] bg-indigo-600"}`}></div>
                    </div>
                </div>

                {step === 1 && (
                    <div className="space-y-4">
                        <Input label="Họ tên *" name="fullName" icon={<FiUser />} value={formData.fullName} onChange={handleChange} error={errors.fullName} />
                        <Input label="Số điện thoại *" name="phone" type="tel" icon={<FiPhone />} value={formData.phone} onChange={handleChange} error={errors.phone} />
                        <Input label="Email *" name="email" type="email" icon={<FiMail />} value={formData.email} onChange={handleChange} error={errors.email} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select label="Giới tính *" name="gender" icon={<FiUserCheck />} value={formData.gender} onChange={handleChange} options={["Nam", "Nữ", "Khác"]} error={errors.gender} />
                            <Input label="Ngày sinh *" name="dob" type="date" icon={<FiCalendar />} value={formData.dob} onChange={handleChange} error={errors.dob} />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <Input label="Tên doanh nghiệp *" name="company" icon={<FiBriefcase />} value={formData.company} onChange={handleChange} error={errors.company} />
                        <Input label="Chức vụ *" name="position" icon={<FiUserPlus />} value={formData.position} onChange={handleChange} error={errors.position} />
                        <div>
                            <label className="block font-semibold mb-1">Vai trò *</label>
                            <div className="flex gap-4 flex-wrap">
                                {["Mentor", "Mentee"].map((roleOption) => (
                                    <label key={roleOption} className="flex items-center gap-2">
                                        <input type="checkbox" name="roles" value={roleOption} checked={formData.roles?.includes(roleOption)} onChange={handleRoleChange} />
                                        {roleOption}
                                    </label>
                                ))}
                            </div>
                            {errors.roles && <p className="text-red-500 text-sm mt-1">{errors.roles}</p>}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-12">
                        <h3 className="text-3xl font-bold text-green-600 mb-4">🎉 Đăng ký thành công!</h3>
                        <p className="text-gray-600">Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ sớm nhất.</p>
                    </div>
                )}
            </div>

            {step < 3 && (
                <div className="w-full p-4 border-t bg-white flex justify-between gap-2 fixed bottom-0 left-0">
                    {step > 1 && (
                        <button onClick={prevStep} className="flex-1 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Quay lại</button>
                    )}
                    <button onClick={nextStep} className={`flex-1 ${step < 2 ? "bg-gradient-to-b from-[#1E1A85] to-[#3498db]" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded`}>
                        {step < 2 ? "Tiếp tục" : "Hoàn tất"}
                    </button>
                </div>
            )}
        </div>
    );
}

function Input({ label, name, type = "text", onChange, icon, value, error }) {
    return (
        <div>
            <label className="block font-semibold mb-1">
                {label}
                {error && <span className="text-red-600 ml-2 text-sm">{error}</span>}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                        {icon}
                    </span>
                )}
                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`w-full h-10 border ${error ? "border-red-500" : "border-gray-300"} rounded pl-10 pr-3 py-2`}
                />
            </div>
        </div>
    );
}

function Select({ label, name, onChange, options = [], icon, value, error }) {
    return (
        <div>
            <label className="block font-semibold mb-1">
                {label}
                {error && <span className="text-red-600 ml-2 text-sm">{error}</span>}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                        {icon}
                    </span>
                )}
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full h-10 border ${error ? "border-red-500" : "border-gray-300"} rounded pl-10 pr-3 py-2`}
                >
                    <option value="">Chọn</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
