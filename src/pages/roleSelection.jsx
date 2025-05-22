import RoleCard from "@/components/Card/RoleCard";
import useAppNavigation from "@/hooks/useNavigation";
import images from "@/assets/images";
import { Page, Button } from "zmp-ui";

export default function SelectRolePage() {
    const { goBack, goToMentee, goToMentor } = useAppNavigation();

    return (
        <Page className="bg-gradient-to-b from-[#2B3990] to-[#3A8DDF] min-h-screen flex flex-col  items-center">
            <div className="text-white font-semibold text-2xl text-center mt-8 mb-6 drop-shadow">
                Bạn Muốn Trở Thành<br />Mentee Hay Mentor?
            </div>

            <div className="w-[90%] max-w-md">
                <RoleCard
                    onClick={goToMentee}
                    title="Mentee"
                    description="Cựu sinh viên, Sinh viên có khát vọng phát triển bản thân, xây dựng sự nghiệp, tạo giá trị cho cộng đồng"
                    image={images.mentee}
                />

                <RoleCard
                    onClick={goToMentor}
                    title="Mentor"
                    description="Anh/chị cựu sinh viên có kinh nghiệm về quản trị & điều hành doanh nghiệp"
                    image={images.mentor}
                />
            </div>

            <Button
                variant="secondary"
                className="mt-8 rounded-full px-8 py-3 text-base font-semibold"
                onClick={goBack}
            >
                Quay lại
            </Button>
        </Page>
    );
}
