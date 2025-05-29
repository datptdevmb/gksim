import { useEffect, useState } from "react";
import CallToActionCard from "@/components/Card/CallToActionCard";
import PostCard from "@/components/Card/PostCard";
import useAppNavigation from "@/hooks/useNavigation";
import images from "@/assets/images";
import Container from "@/components/Container/Container";
import UserSession from "@/utils/session";
import { handleAuthorize } from "@/utils/zaloAuth";
import { loginZalo } from "@/services/auth";
import { getNews } from "@/services/News";

function HomePage() {


  const { goToRegis, goToNewsPost } = useAppNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountStatus, setAccountStatus] = useState("none"); // [none , pending ,approved]
  const [hasRegistered, setHasRegistered] = useState(false);


  useEffect(() => {
    const { status, zaloId } = UserSession.getAll();

    if (zaloId) {
      //check zaloId 
      setHasRegistered(true);
      setAccountStatus(status || "none");
      // login 
      loginZalo(zaloId)
    }

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = UserSession.get("user_id");
        if (userId) {
          const response = await getNews();
          setData(response);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }
    , []);


  const handleClickRegis = () => handleAuthorize(goToRegis)
  const handelClickNewsPost = () => goToNewsPost()


  return (
    <Container>
      <CallToActionCard
        status={accountStatus || "none"}
        logo={images.logoSecond}
        title="Trở thành thành viên"
        subTitle=" BKASim - Mentoring"
        buttonText={hasRegistered ? "Đã đăng ký" : "Đăng ký ngay"}
        onClick={handleClickRegis}
      />

      <PostCard
        loading={loading}
        image={data?.avatar}
        title={data?.name}
        onClick={handelClickNewsPost}
      />
    </Container>
  );
}

export default HomePage;
