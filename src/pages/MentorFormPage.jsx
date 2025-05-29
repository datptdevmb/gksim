import BaseRegisterForm from "@/components/Form/BaseRegisterForm";

export default function MentorFormPage() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Gửi thông tin Mentor thành công!");
    };

    return <BaseRegisterForm title="Trở thành Mentor" onSubmit={handleSubmit} />;
}
