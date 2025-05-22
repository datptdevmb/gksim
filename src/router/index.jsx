import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Loadable from "@/components/Loadable";
import MainLayout from "@/Layout/MainLayout";

const HomePage = Loadable(lazy(() => import("@/pages/home")));
const SearchPage = Loadable(lazy(() => import("@/pages/search")));
const NotificationPage = Loadable(lazy(() => import("@/pages/noticate")));
const ProfilePage = Loadable(lazy(() => import("@/pages/profilePage")));
const NewsPage = Loadable(lazy(() => import("@/pages/newsPage")));
const SelectRolePage = Loadable(lazy(() => import("@/pages/roleSelection")));
const MenteeFormPage = Loadable(lazy(() => import("@/pages/MenteeFormPage")));
const MentorFormPage = Loadable(lazy(() => import("@/pages/MentorFormPage")));
const NewsDetailPage = Loadable(lazy(() => import("@/pages/newsDetailpage")));
const BookingMentoring = Loadable(lazy(() => import("@/pages/booking/BookingMentoring")));
const BookingConfirmationPage = Loadable(lazy(() => import("@/pages/booking/BookingComfimPage")));
const BookingDetailPage = Loadable(lazy(() => import("@/pages/booking/BookingDetailPage")));
const Regis = Loadable(lazy(() => import("@/pages/regis")));
const EditProfilePage = Loadable(lazy(() => import("@/pages/editprofile")));

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/SearchPage" element={<SearchPage />} />
      <Route path="/Noticate" element={<NotificationPage />} />
      <Route path="/Setting" element={<ProfilePage />} />
      <Route path="/newsPost" element={<NewsPage />} />
      <Route path="/Regis" element={<SelectRolePage />} />
      <Route path="/mentee" element={<MenteeFormPage />} />
      <Route path="/mentor" element={<MentorFormPage />} />
      <Route path="/news-detail" element={<NewsDetailPage />} />
      <Route path="/Booking" element={<BookingMentoring />} />
      <Route path="/booking-detail" element={<BookingDetailPage />} />
      <Route path="/booking-confirm" element={<BookingConfirmationPage />} />
      <Route path="/regis" element={<Regis />} />
      <Route path="/editprofile" element={<EditProfilePage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
