import { createI18n } from "vue-i18n";
import session from "@/service/session/session";
import eng from "./eng/eng";
import tl from "./tl/tl";

const messages = {
    english: eng,
    tagalog: tl,
};

export default createI18n({
    legacy: false,
    locale: session.get("locale") || "english",
    fallbackLocale: "english",
    messages,
});
