import TitleBarLocal from "@/components/TitleBar/TitleBarLocal";
import DonateTranslations from "./../components/Donate/DonateTranslations"

const translations = {
    login: {
        english: "Login",
        filipino: "Mag-login",
        korean: "로그인",
        spanish: "Iniciar sesión",
        chinese: "登录"
    },
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