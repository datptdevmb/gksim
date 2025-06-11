
/**
 * Props:
 * @param {string} title - Text displayed inside the button (if `children` is not provided)
 * @param {string} variant - One of: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon' | 'confirm' (default: 'primary')
 * @param {string} size - One of: 'sm' | 'md' | 'lg' (default: 'md')
 * @param {boolean} disabled - Disables the button (default: false)
 * @param {boolean} loading - Displays a loading spinner and disables click (default: false)
 * @param {boolean} gradient - Applies gradient background style (default: false)
 * @param {boolean} fullWidth - Expands button to full container width (default: false)
 * @param {boolean} rounded - Renders button with full border radius (default: false)
 * @param {ReactNode} icon - Optional icon displayed before text
 * @param {function} onClick - Function called when the button is clicked
 * @param {string} type - HTML button type: 'button', 'submit', 'reset' (default: 'button')
 * @param {ReactNode} children - Overrides `title` if provided
 */



import { memo } from "react";
import classNames from "classnames";
import { base, sizeClasses, variantClasses, gradientClass } from "./button.config";

function ButtonApp({
      title = "",
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      gradient = false,
      fullWidth = false,
      rounded = false,
      icon = null,
      onClick = () => { },
      type = "button",
      children,
}) {
      const isDisabled = disabled || loading;

      const classes = classNames(
            base,
            sizeClasses[size],
            gradient ? gradientClass : variantClasses[variant],
            {
                  "w-full": fullWidth,
                  "rounded-full": rounded,
                  "rounded-md": !rounded && variant !== "icon",
                  "opacity-50 cursor-not-allowed": isDisabled,
            }
      );

      return (
            <button
                  type={type}
                  className={classes}
                  onClick={onClick}
                  disabled={isDisabled}
            >
                  {loading ? (
                        <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Đang xử lý...
                        </span>
                  ) : (
                        <>
                              {icon && <span className="mr-2">{icon}</span>}
                              {children || title}
                        </>
                  )}
            </button>
      );
}

export default memo(ButtonApp);
