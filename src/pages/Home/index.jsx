import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CallToActionCard } from "@/components/Card";
import PostCard from "@/components/Card/Blog/BlogCard";
import useAppNavigation from "@/hooks/useNavigation";
import images from "@/assets/images";
import Container from "@/components/Container/Container";
import UserSession from "@/utils/session";
import { handleAuthorize } from "@/utils/zaloAuth";
import { loginZalo } from "@/services/auth";
import { getNews } from "@/services/News";

function HomePage() {

  const { goToRegis, goToNewsPost } = useAppNavigation();
  const [accountStatus, setAccountStatus] = useState("none");
  const [hasRegistered, setHasRegistered] = useState(false);

  const {
    data: news,
    isLoading,
  } = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
    staleTime: 5 * 60 * 1000,
  });
  

  useEffect(() => {
    const { status, zaloId } = UserSession.getAll();
    if (zaloId) {
      setHasRegistered(true);
      setAccountStatus(status || "none");
      loginZalo(zaloId);
    }
  }, []);

  const handleClickRegis = () => handleAuthorize(goToRegis);
  const handleClickNewsPost = () => goToNewsPost();

  return (
    <Container>
      <CallToActionCard
        status={accountStatus}
        logo={images.logoSecond}
        title="Trở thành thành viên"
        subTitle="BKASim - Mentoring"
        buttonText={hasRegistered ? "Đã đăng ký" : "Đăng ký ngay"}
        onClick={handleClickRegis}
      />

      <PostCard
        loading={isLoading}
        image={news?.image}
        title={news?.title }
        onClick={handleClickNewsPost}
      />
    </Container>
  );
}

export default HomePage;
