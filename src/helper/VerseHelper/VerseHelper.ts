export const setVersesUneditable = (millisecond: number): void => {
    setTimeout(() => {
        const parentElement = document.getElementById("verses-view");
        parentElement?.querySelectorAll("[contenteditable]").forEach((el) => {
            el.addEventListener("keydown", function (evt: any) {
                if (evt.code === "KeyC") return true;
                evt.preventDefault();
            });
            el.addEventListener("drop", (event) => {
                event.preventDefault();
            });
        });
    }, millisecond);
};

