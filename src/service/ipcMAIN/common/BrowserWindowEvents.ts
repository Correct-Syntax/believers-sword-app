export const minimizeWindow = (win: any) => {
    win.minimize();
};

export const maximizeWindow = (win: any): void => {
    if (win.isMaximized()) {
        win.restore();
        return;
    } else {
        win.maximize();
    }
};


export const closeWindow = (win: any) : void => {
    win.destroy();
}