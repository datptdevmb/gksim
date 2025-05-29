import classNames from "classnames";
import { base, variantClasses } from "../Container/container.config";

function Container({
    bg = "primary",
    padding = "p-4",
    shadow = "shadow-md",
    className = '',
    children,
}) {
    const classes = classNames(
        base,
        variantClasses[bg] || variantClasses["primary"],
        padding,
        shadow,
        className
    );

    return (
        <div className={classes}>
            {children}
        </div>
    );
}

export default Container;
