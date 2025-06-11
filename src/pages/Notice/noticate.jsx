import { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import NotificationItem from "@/components/Notice/NoticeItem";
import TabSwitcher from "@/components/Tab/TabBar";
import { getFollowRequests } from "@/services/follow/follow";

export default function NotificationPage() {
  const tabs = ["Thông báo", "Yêu cầu"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [notifications] = useState([
    {
      message: "Đặt lịch của bạn đã được chấp nhận",
      time: "12:46, 16/03/2025",
      buttonText: "Xem chi tiết",
    },
    {
      message: "Đã tiến hành gửi thông báo ZNS huỷ lịch",
      time: "12:46, 16/03/2025",
    },
  ]);

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  useEffect(() => {
    if (activeTab === "Yêu cầu") {
      setLoadingRequests(true);
      getFollowRequests().then(setRequests).finally(() => setLoadingRequests(false));
    }
  }, [activeTab]);

  const listToRender =
    activeTab === "Thông báo" ? notifications : requests.map((req) => ({
      message: `${req.senderName || "Người dùng"} muốn kết nối với bạn`,
      time: req.createdAt || "N/A",
      buttonText: "Phản hồi",
    }));

  return (
    <div className="flex flex-col h-full">
      <TabSwitcher
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <Container className="pt-2">
        {activeTab === "Yêu cầu" && loadingRequests ? (
          <p className="text-center text-sm text-gray-400 p-4">Đang tải yêu cầu...</p>
        ) : listToRender.length > 0 ? (
          listToRender.map((item, index) => (
            <NotificationItem
              key={index}
              message={item.message}
              time={item.time}
              buttonText={item.buttonText}
              onClick={() => alert("Xử lý yêu cầu")}
            />
          ))
        ) : (
          <p className="text-center text-sm text-gray-400 p-4">Không có mục nào.</p>
        )}
      </Container>
    </div>
  );
}
