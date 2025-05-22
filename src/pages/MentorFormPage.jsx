import UserInfoForm from "@/components/Form/UserInfoForm";

export default function MentorFormPage() {
    const handleSubmit = () => alert("Gửi form Mentor thành công!");
    return <UserInfoForm role="Mentor" onSubmit={handleSubmit} />;
}
