import UserInfoForm from "@/components/Form/UserInfoForm";

export default function MenteeFormPage() {
    const handleSubmit = () => alert("Gửi form Mentee thành công!");
    return <UserInfoForm role="Mentee" onSubmit={handleSubmit} />;
}
