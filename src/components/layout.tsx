import { lazy, Suspense } from "react";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { getSystemInfo } from "zmp-sdk";
import { AppProps } from "zmp-ui/app";

import Header from "./Header/AppHeader";
import BottomNav from "./bottomNavigation";
import NotificationPage from "@/pages/Notice/noticate";
import HomePage from "@/pages/Home";
import SearchPage from "@/pages/Search/search";
import ProfilePage from "@/pages/Profile/profilePage";
import BookingMentoring from "@/pages/Booking/BookingMentoring";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// ✅ Tạo query client một lần
const queryClient = new QueryClient();

import BlogPage from '../pages/Blog/BlogPage'
import { NetworkStatusProvider, useNetworkStatus } from "@/context/NetworkStatusContext";
import ConnectionLost from "./Shared/ConnectionLost";
// const SelectRolePage = lazy(() => import("@/pages/roleSelection"));
const MenteeFormPage = lazy(() => import("@/pages/MenteeFormPage"));
const MentorFormPage = lazy(() => import("@/pages/MentorFormPage"));
const NewsDetailPage = lazy(() => import("@/pages/Blog/newsDetailpage"));
const BookingConfirmationPage = lazy(() => import("@/pages/bookingComfimPage"));
const BookingDetailPage = lazy(() => import("@/pages/bookingDetailPage"));
const Regis = lazy(() => import("@/pages/regis"));
const EditProfilePage = lazy(() => import("@/pages/Profile/editprofile"));

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
        <SnackbarProvider>
          <ZMPRouter>
            <div className="flex flex-col h-screen overflow-hidden">
              {/* Header cố định */}
              <div className="flex-none h-[88px]">
                <Header />
              </div>

              {/* Nội dung chính */}
              <main className="flex-1 overflow-y-auto">
                <Suspense fallback={
                  <div className="flex justify-center items-center h-full">Đang tải...</div>
                }>
                  {/* <NetworkStatusProvider>
                    <AnimationRoutes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/SearchPage" element={<SearchPage />} />
                      <Route path="/Noticate" element={<NotificationPage />} />
                      <Route path="/Setting" element={<ProfilePage />} />
                      <Route path="/newsPost" element={<BlogPage />} />
                      <Route path="/Regis" element={<Regis />} />
                      <Route path="/mentee" element={<MenteeFormPage />} />
                      <Route path="/mentor" element={<MentorFormPage />} />
                      <Route path="/news-detail/:id" element={<NewsDetailPage />} />
                      <Route path="/Booking" element={<BookingMentoring />} />
                      <Route path="/booking-detail" element={<BookingDetailPage />} />
                      <Route path="/booking-confirm" element={<BookingConfirmationPage />} />
                      <Route path="/editprofile" element={<EditProfilePage />} />
                    </AnimationRoutes>
                  </NetworkStatusProvider> */}
                  <NetworkStatusProvider>
                    <MainContent />
                  </NetworkStatusProvider>


                </Suspense>
              </main>

              <div>
                <BottomNav />
              </div>
            </div>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </QueryClientProvider>
  );
};



const MainContent = () => {
  const { connectionError, setConnectionError } = useNetworkStatus();

  return (
    <main className="flex-1 overflow-y-auto">
      {connectionError ? (
        <ConnectionLost
          variant={connectionError}
          onRetry={() => {
            setConnectionError(false);
            window.location.reload();
          }}
        />
      ) : (
        <Suspense fallback={
          <div className="flex justify-center items-center h-full">Đang tải...</div>
        }>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SearchPage" element={<SearchPage />} />
            <Route path="/Noticate" element={<NotificationPage />} />
            <Route path="/Setting" element={<ProfilePage />} />
            <Route path="/newsPost" element={<BlogPage />} />
            <Route path="/Regis" element={<Regis />} />
            <Route path="/mentee" element={<MenteeFormPage />} />
            <Route path="/mentor" element={<MentorFormPage />} />
            <Route path="/news-detail/:id" element={<NewsDetailPage />} />
            <Route path="/Booking" element={<BookingMentoring />} />
            <Route path="/booking-detail" element={<BookingDetailPage />} />
            <Route path="/booking-confirm" element={<BookingConfirmationPage />} />
            <Route path="/editprofile" element={<EditProfilePage />} />
          </AnimationRoutes>
        </Suspense>
      )}
    </main>
  );
};


export default Layout;
