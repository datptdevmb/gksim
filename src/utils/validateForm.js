// utils/validateForm.js
export const validateStep1 = (data) => {
    const errors = {};
    if (!data.fullName.trim()) errors.fullName = "Họ tên bắt buộc";
    if (!data.phone.trim()) errors.phone = "Số điện thoại bắt buộc";
    if (!data.email.trim()) errors.email = "Email bắt buộc";
    if (!data.gender) errors.gender = "Chọn giới tính";
    if (!data.dob) errors.dob = "Chọn ngày sinh";
    return errors;
};

export const validateStep2 = (data) => {
    const errors = {};
    if (!data.company.trim()) errors.company = "Tên doanh nghiệp bắt buộc";
    if (!data.position.trim()) errors.position = "Chức vụ bắt buộc";
    if (!data.roles || data.roles.length === 0) errors.roles = "Chọn ít nhất một vai trò";
    return errors;
};
