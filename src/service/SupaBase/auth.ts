import SESSION from "../session/session";

export const isUserLogged = () => {
    const session = SESSION.get("session");

    return session;
};
