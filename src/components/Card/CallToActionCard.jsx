import ButtonApp from "../Button/ButtonApp";
import clsx from "clsx";
import { cardBase, cardWrapperClass, noticeClass } from "./CallToActionCard.config";
import { memo } from "react";

/**
 * CallToActionCard
 * -----------------

 * Props:
 * - logo: string
 * - title: string
 * - subTitle: string
 * - approvedTitle: string
 * - approvedSubTitle: string
 * - logoApproved: string
 * - status: "none" | "pending" | "approved" ...
 * - buttonText: string
 * - onClick: function
 */

const STATUS_META = {

    none: (props) => ({
        logo: props.logo,
        title: props.title,
        subTitle: props.subTitle,
        showButton: true,
        buttonProps: {
            title: props.buttonText || "Đăng ký ngay",
            onClick: props.onClick,
            size: "sm",
            gradient: true,
        },
    }),

    pending: (props) => ({
        logo: props.logo,
        title: props.title,
        subTitle: props.subTitle,
        showButton: true,
        buttonProps: {
            title: "Đã đăng kí",
            variant: "secondary",
            size: "sm",
            disabled: true,
        },
        notice: "Yêu cầu của bạn đang được chờ duyệt",
    }),

    approved: (props) => ({
        logo: props.logoApproved || props.logo,
        title: props.approvedTitle || "Bạn đã là thành viên",
        subTitle: props.approvedSubTitle || "Chào mừng bạn trở lại",
        showButton: false,
    }),
};


function CallToActionCard(props) {
    const meta = (STATUS_META[props.status] || STATUS_META["none"])(props);

    const wrapperClass = clsx(
        cardBase,
        meta.notice ? cardWrapperClass.withNotice : cardWrapperClass.normal
    );

    return (
        <div className="mb-6">
            <div className={wrapperClass}>
                <div className="flex items-center gap-3">
                    <img src={meta.logo} alt="logo" className="h-10 w-10 rounded" />
                    <div className="text-sm text-black font-medium">
                        <span>{meta.title}</span>
                        <br />
                        <span className="text-xs text-gray-500">{meta.subTitle}</span>
                    </div>
                </div>

                {meta.showButton && <ButtonApp {...meta.buttonProps} />}
            </div>

            {meta.notice && (
                <div className={noticeClass}>
                    {meta.notice}
                </div>
            )}
        </div>
    );
}

export default memo(CallToActionCard);
