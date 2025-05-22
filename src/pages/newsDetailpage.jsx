import AppHeader from "@/components/MainHeader/MainHeader";
import NewsDetailContent from "@/components/News/NewsDetailContent";
import ButtonApp from "@/components/Button/ButtonApp";
import images from "@/assets/images";
import Container from "@/components/Container/Container";
import { Modal, Icon, Box } from "zmp-ui";
import { useState } from "react";
import FormFooterButton from "@/components/Footer/FormFooterButton";
import { Button } from "zmp-ui";


export default function NewsDetailPage() {
    const [showModal, setShowModal] = useState(false);
    const content = `
📱 Giới thiệu sản phẩm...
🔥 AI tích hợp thông minh...
✅ Sạc nhanh 65W - 🔋 Đạt 70% pin chỉ trong 20 phút...
🧠 Trải nghiệm camera sắc nét...
📱 Giới thiệu sản phẩm...
🔥 AI tích hợp thông minh...
✅ Sạc nhanh 65W - 🔋 Đạt 70% pin chỉ trong 20 phút...
🧠 Trải nghiệm camera sắc nét...📱 Giới thiệu sản phẩm...
🔥 AI tích hợp thông minh...
✅ Sạc nhanh 65W - 🔋 Đạt 70% pin chỉ trong 20 phút...
🧠 Trải nghiệm camera sắc nét...📱 Giới thiệu sản phẩm...
🔥 AI tích hợp thông minh...
✅ Sạc nhanh 65W - 🔋 Đạt 70% pin chỉ trong 20 phút...
🧠 Trải nghiệm camera sắc nét...
  `;

    return (
        <>
        <Container style={{maxHeight: "710px"}} bg="light">
            <NewsDetailContent
                image={images.post1}
                date="05/03/2025"
                author="longnguyen"
                title="Hãng Công Nghệ X Ra Mắt Điện Thoại Mới Với Công Nghệ AI Tích Hợp"
                content={content}
            />
            <Modal
                visible={showModal}
                onClose={() => setShowModal(false)}
                maskClosable
                className="rounded-xl"
            >
                <Box className="p-4 text-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                        alt="Share background"
                        className="w-24 h-24 mx-auto mb-3 rounded"
                    />
                    <h2 className="font-bold text-lg mb-2">Chia sẻ bài viết</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Đừng quên chia sẻ bài viết này với bạn bè để cùng nhau khám phá thêm nhiều thông tin thú vị
                    </p>
                    <div className="flex flex-col gap-2">
                        <button
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center text-blue-600 font-medium transition hover:bg-gray-100"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setShowModal(false);
                            }}
                        >
                            <Icon icon="zi-copy" className="mr-2" />
                            Sao chép đường dẫn
                        </button>
                        <button
                            className="bg-[#0084ff] text-white rounded-lg px-4 py-2 flex items-center justify-center font-medium transition hover:bg-blue-600"
                            onClick={() => {
                                // TODO: Thêm logic chia sẻ qua Zalo
                                setShowModal(false);
                            }}
                        >
                            <Icon icon="zi-zalo" className="mr-2" />
                            Chia sẻ qua Zalo
                        </button>
                    </div>
                </Box>
            </Modal>
        </Container>
            <Button
                type="button"
                className="w-full rounded-[10px] py-3 font-semibold text-base text-white bg-gradient-to-r from-[#1e2a78] to-[#3a8dde] shadow-md border-0"
                style={{
                    background: "linear-gradient(90deg, #1e2a78 0%, #3a8dde 100%)",
                    color: "#fff",
                }}
                onClick={() => setShowModal(true)}
            >
                Chia sẻ
            </Button>
        </>
    );
}
