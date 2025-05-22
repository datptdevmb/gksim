import { Suspense, useEffect, useState } from "react";
import { App, SnackbarProvider } from "zmp-ui";
import { getSystemInfo } from "zmp-sdk";
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from "@/components/MainHeader/MainHeader";
import BottomNav from "@/components/bottomNavigation";
import { AnimatePresence, motion } from "framer-motion";

const MainLayout = () => {
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  useEffect(() => {
    getSystemInfo({
      success: (res) => {
        setTheme(res.zaloTheme || "light");
      },
    });
  }, []);

  return (
    <App theme={theme}>
      <SnackbarProvider>
        <div className="flex flex-col h-screen">
          <div className="flex-none h-[70px]">
            <MainHeader />
          </div>
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="sync">
              <motion.div
                key={location.pathname}
                initial={{ x: "100%", opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-full h-full top-0 left-0"
              >
                <Suspense fallback={null}>
                  <Outlet />
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </div>
          <div>
            <BottomNav />
          </div>
        </div>
      </SnackbarProvider>
    </App>
  );
};

export default MainLayout;
