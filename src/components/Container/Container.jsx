

import classNames from "classnames";
import { base, variantClasses } from "../Container/container.config";





function Container({
    bg = "primary",
    children,
    className = '',
    style = {}
}) {

    const classes = classNames(
        base,
        variantClasses[bg]
    );

    return (
        <div
            className={`${classes} ${className}`}
            style={style}
        >
            {children}
        </div>
    )
}

export default Container;