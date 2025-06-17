import React from "react";
import ButtonApp from "../Button/ButtonApp";
import images from "@/assets/images";
import * as style from "./connec.config.js";

const ConnectionLost = ({ onRetry, variant = "default" }) => {
    const { image = images.errConnect, title, subtitle } =
        style.variantClasses[variant] || style.variantClasses.default;

    return (
        <div className={style.wrapper}>
            {image && (
                <img
                    src={image}
                    alt={title}
                    className={style.image}
                    loading="lazy"
                />
            )}
            <div className="max-w-md mx-auto px-4">
                <h2 className={style.title}>{title}</h2>
                <p className={style.subtitle}>{subtitle}</p>
                <div className={style.retryButton}>
                    <ButtonApp
                        title="Thử lại"
                        onClick={onRetry}
                        variant="primary"
                        size="md"
                    />
                </div>
            </div>
        </div>
    );
};

export default ConnectionLost;
