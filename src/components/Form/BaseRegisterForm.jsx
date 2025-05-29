import SectionTitle from "./SectionTitle";
import FormInput from "./FormInput";
import FormFooterButton from "./FormFooterButton";

export default function BaseRegisterForm({ title, onSubmit }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1E1A85] to-[#3498db] text-white">
            <div className="text-center py-6">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm mt-1">Nhập thông tin của bạn</p>
            </div>

            <form className="px-4 space-y-4 pb-24" onSubmit={onSubmit}>
                <SectionTitle title="Thông tin cá nhân" />
                <FormInput label="Họ và tên" required placeholder="Nguyễn Văn A" />
                <FormInput label="Số điện thoại người nhận" required placeholder="0933209346" type="tel" />
                <FormInput label="Email" placeholder="Nhập địa chỉ email" type="email" />
                <FormInput label="Ngày sinh" type="date" />
                <FormInput label="Giới tính" type="select" options={["Nam", "Nữ", "Khác"]} />

                <SectionTitle title="Thông tin doanh nghiệp" />
                <FormInput label="Tên công ty" placeholder="Nhập tên công ty" />
                <FormInput label="Chức vụ" placeholder="Nhập chức vụ" />
            </form>
        </div>
    );
}
