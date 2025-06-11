import images from "@/assets/images";
import ButtonApp from "@/components/Button/ButtonApp";
import PersonalityTestCard from "@/components/Card/Personality/PersonalityTestCard";
import UserCard from "@/components/Card/User/UserCard";
import Container from "@/components/Container/Container";
import Header from "@/components/Header/AppHeader";
import useAppNavigation from "@/hooks/useNavigation";
import { getUserInfor } from "@/services/auth";
import { useEffect, useState } from "react";
import { Icon } from "zmp-ui";

export default function ProfilePage() {
    const { goToEditProfile, goToMbtiTest } = useAppNavigation();
    const [user, setUser] = useState([]);



    useEffect(() => {
        const userId = localStorage.getItem("user_id");

        getUserInfor(userId)
            .then((data) => setUser(data))
            .catch(() => setUser([]));

    }, []);

    return (
        <Container>
            <UserCard {...user} />
            <PersonalityTestCard />
        </Container>
    );
}
