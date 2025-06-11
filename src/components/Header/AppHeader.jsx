
/**
 * AppHeader Component
 *
 * A reusable header component used across the application.
 * It dynamically displays a centered logo (on the homepage)
 * or a formatted title based on the current route.
 *
 * Props:
 * @param {string} [logo] - Optional custom logo source. Defaults to app logo from assets.
 * @param {boolean} [showBack=false] - When true and not on the homepage, shows a back button.
 *
 * Behavior:
 * - Displays the app logo at the center if on the homepage (`/`).
 * - Displays the current route title (formatted) on other pages.
 * - Automatically capitalizes and spaces the title (e.g., `/booking-history` → "Booking History").
 * - The optional back button triggers `goBack()` from custom navigation hook.
 *
 * Styling:
 * - Uses a gradient background by default (`from-[#1E1A85] to-[#3498db]`).
 * - Fully mobile responsive and centered content.
 *
 * Example:
 * ```jsx
 * // On a normal page with back support
 * <AppHeader showBack />
 *
 * // With custom logo
 * <AppHeader logo="/assets/my-custom-logo.png" />
 * ```
 *
 * Extendable:
 * - You can add more action buttons (e.g., menu, settings) in the `optional actions` area.
 */


import { memo, useMemo } from "react";
import { useLocation } from "zmp-ui";
import images from "@/assets/images";
import {
    defaultGradient,
    headerContainerBase,
    centeredTitleClass,
    logoClass,
    backButtonClass,
} from "./AppHeader.Config";
import { formatTitle } from "@/utils/format";
import { FiArrowLeft } from "react-icons/fi";
import useAppNavigation from "@/hooks/useNavigation";

function AppHeader({ logo = null, showBack = false }) {
    const location = useLocation();
    const { goBack } = useAppNavigation();

    const isHome = useMemo(() => location.pathname === "/", [location.pathname]);
    const title = useMemo(() => formatTitle(location.pathname), [location.pathname]);

    return (
        <header className={`${defaultGradient} ${headerContainerBase}`}>
            {/* Nút Back  */}
            {showBack && !isHome && (
                <button onClick={goBack} className={backButtonClass} aria-label="Back">
                    <FiArrowLeft size={18} />
                </button>
            )}

            <div className={centeredTitleClass}>
                {isHome ? (
                    <img
                        src={logo || images.logo}
                        alt="logo"
                        className={logoClass}
                    />
                ) : (
                    title
                )}
            </div>

            <div className="flex items-center space-x-2">{/* optional actions */}</div>
        </header>
    );
}

export default memo(AppHeader);
