/**
 * InputApp - A customizable input field with optional icon, error display, and styling variants.
 *
 * @component
 *
 * @example
 * <InputApp
 *   label="Email"
 *   placeholder="Nhập email của bạn"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   type="email"
 *   variant="outline"
 *   size="md"
 *   icon={<MailIcon />}
 *   error="Email không hợp lệ"
 * />
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional label shown above the input
 * @param {string} [props.placeholder] - Placeholder text for the input
 * @param {string|number} [props.value] - Controlled input value
 * @param {function} props.onChange - Function to call when the input value changes
 * @param {string} [props.type="text"] - HTML input type
 * @param {string} [props.variant="default"] - Style variant
 * @param {string} [props.size="md"] - Input size
 * @param {boolean} [props.disabled=false] - Disable the input
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.fullWidth=true] - Expand input to full width
 * @param {string} [props.className] - Additional custom className
 * @param {React.ReactNode} [props.icon] - Optional icon shown inside input (left side)
 * @param {React.Ref} ref - Forwarded ref
 *
 * @returns {JSX.Element}
 */

import classNames from "classnames";
import { forwardRef } from "react";
import { baseClass, variantClass, sizeClass } from "./InputConfig.js";

const InputApp = forwardRef(function InputApp(
      {
            label,
            placeholder = "",
            value,
            onChange,
            type = "text",
            variant = "default",
            size = "md",
            disabled = false,
            error = "",
            fullWidth = true,
            className = "",
            icon = null,
            ...props
      },
      ref
) {
      const inputClass = classNames(
            baseClass,
            variantClass[variant],
            sizeClass[size],
            className,
            {
                  "w-full": fullWidth,
                  "bg-gray-100 cursor-not-allowed": disabled,
                  "border-red-500": !!error,
            }
      );

      return (
            <div className="flex flex-col gap-1">
                  {label && <label className="text-sm font-medium">{label}</label>}
                  <div className="relative flex items-center">
                        {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
                        <input
                              ref={ref}
                              type={type}
                              className={classNames(inputClass, icon && "pl-10")}
                              placeholder={placeholder}
                              value={value}
                              onChange={onChange}
                              disabled={disabled}
                              {...props}
                        />
                  </div>
                  {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
      );
});

export default InputApp;
