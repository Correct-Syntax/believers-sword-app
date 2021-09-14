import session from "../session/session";

export const saveScrollTopState = (className: string, inArray = 0, sessionKey: string, scrollTopSubtract = 0): void => {
    const el = document.getElementsByClassName(className)[inArray];
    if (el instanceof HTMLElement) {
        session.set(sessionKey, el.offsetTop - scrollTopSubtract);
    }
};

export const setScrollTopState = (className: string, sessionKey: string, setScrollTopValue = 0): void => {
    const el2 = document.getElementsByClassName(className)[0];
    if (el2 instanceof HTMLElement) {
        if (setScrollTopValue > 0) session.set(sessionKey, setScrollTopValue);
        el2.scrollTop = session.get(sessionKey) ? session.get(sessionKey) : 0;
    }
};