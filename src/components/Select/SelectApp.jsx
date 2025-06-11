import { memo } from "react";
import classNames from "classnames";
import {
    selectClasses,
    selectSizeClasses,
    selectVariantClasses,
    defaultPlaceholder,
} from "./Select.Config";

function SelectApp({
    options = [],
    value,
    onChange,
    placeholder = defaultPlaceholder,
    size = "md",
    variant = "default",
    disabled = false,
}) {
    const classes = classNames(
        selectClasses.base,
        selectSizeClasses[size] || selectSizeClasses.md,
        selectVariantClasses[variant] || selectVariantClasses.default,
        {
            "opacity-50 cursor-not-allowed": disabled,
        }
    );

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={classes}
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((option, idx) => (
                <option key={option.value || idx} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default memo(SelectApp);
