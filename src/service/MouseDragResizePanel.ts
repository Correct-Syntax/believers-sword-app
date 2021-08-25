import session from "@/helper/session";

/* eslint-disable */
export const dragElementHorizontally: any = (el: string, direction: string, leftSideElement: string, rightSideElement: string) => {
    let md: any;
    const first = document.getElementById(leftSideElement);
    const second = document.getElementById(rightSideElement);
    const element = document.getElementById(el);
    if (element) element.onmousedown = onMouseDown;

    function onMouseDown(e: any) {
        md = {
            e,
            offsetLeft: element?.offsetLeft,
            offsetTop: element?.offsetTop,
            firstWidth: first?.offsetWidth,
            secondWidth: second?.offsetWidth
        };

        document.onmousemove = onMouseMove;
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
        };
    }

    function onMouseMove(e: any) {
        const delta = {
            x: e.clientX - md.e.clientX,
            y: e.clientY - md.e.clientY
        };

        if (direction === "H") {
            delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);

            if (element) element.style.left = md.offsetLeft + delta.x + "px";
            if (first) first.style.width = md.firstWidth + delta.x + "px";
            if (second) second.style.width = md.secondWidth - delta.x + "px";
        }
    }
};

export const reSizeElementHorizontally: any = (el: string, direction: string, leftSideElement: string, rightSideElement: string) => {
    let md: any;
    const first = document.getElementById(leftSideElement);
    const second = document.getElementById(rightSideElement);
    const element = document.getElementById(el);
    if (element) element.onmousedown = onMouseDown;

    function onMouseDown(e: any) {
        md = {
            e,
            offsetLeft: element?.offsetLeft,
            offsetTop: element?.offsetTop,
            firstWidth: first?.offsetWidth,
            secondWidth: second?.offsetWidth
        };

        document.onmousemove = onMouseMove;
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
        };
    }

    function onMouseMove(e: any) {
        const delta = {
            x: e.clientX - md.e.clientX,
            y: e.clientY - md.e.clientY
        };

        if (direction === "H") {
            delta.x = Math.min(Math.max(delta.x, -md.firstWidth), md.secondWidth);

            if (element) element.style.left = md.offsetLeft + delta.x + "px";
            if (first) first.style.width = md.firstWidth + delta.x + "px";
            if (second) second.style.width = md.secondWidth - delta.x + "px";
        }
    }
};

export const dragSide = (mainContainerWrapper: string, dragBar: string, leftSideVarWidth: string, maxWidth: number = 500, minWidth: number = 50, keyToSaveData: string = ''): void => {
    let dragging = 0,
        body = document.getElementById(mainContainerWrapper),
        target = document.getElementById(dragBar);

    function clearJSEvents() {
        dragging = 0;
        if (body) body.removeEventListener("mousemove", resize);
        if (body) body.classList.remove("resizing");
    }

    function resize(e: any) {
        if (e.pageX > maxWidth || e.pageX < minWidth) {
            return;
        }

        if (keyToSaveData !== '') session.set(keyToSaveData, e.pageX);

        if (body) body.style.setProperty(leftSideVarWidth, e.pageX + "px");
    }
    if (target)
        target.onmousedown = function(e) {
            e.preventDefault();
            dragging = 1;
            if (body) body.addEventListener("mousemove", resize);
            if (body) body.classList.add("resizing");
        };

    document.onmouseup = function() {
        dragging ? clearJSEvents() : "";
    };
};
