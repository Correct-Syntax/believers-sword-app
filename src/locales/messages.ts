import TitleBarLocal from "@/components/TitleBar/TitleBarLocal";
import DonateTranslations from "./../components/Donate/DonateTranslations"
import LocalesPerWord from "./LocalesPerWord";

const translations = {
    ...LocalesPerWord,
    ...TitleBarLocal,
    ...DonateTranslations
}

export const localeMessages = (locale: string) => {
    const translation: any = {};
    for (const [key, value] of Object.entries(translations)) {
        const theKey: any = key;
        const theValue: any = value;
        translation[theKey] = theValue[locale];
    }
    return translation;
}