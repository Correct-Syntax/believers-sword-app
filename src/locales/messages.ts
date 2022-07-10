import DonateTranslations from "./../components/Donate/DonateTranslations"

const translations = {
    title: {
        english: "Believers Sword",
        tagalog: "Sandata ng Mananampalataya"
    },
    feedback: {
        english: "Feedback",
        tagalog: "Mga Puna"
    },
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