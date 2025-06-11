import uiConfig from "@/config/uiConfig";
// import { defaultGradient } from "@/config/uiConfig";

export const defaultGradient = uiConfig.colors.gradientPrimary

export const headerContainerBase = "px-4 py-6 flex items-center justify-between text-white h-full relative";

export const centeredTitleClass = `
    absolute
    left-1/2
    top-6
    transform -translate-x-1/2
    text-sm
    font-bold
    uppercase
    text-center
    leading-none
`;
export const backButtonClass = `
    absolute left-4 top-6
    text-white p-1 rounded-full
    hover:bg-white hover:text-[#1E1A85]
    transition
`;
export const logoClass = "h-10 object-contain mx-auto";
