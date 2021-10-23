import { BrowserWindow, Menu, MenuItem } from 'electron';

export const contextMenus = (win: BrowserWindow): void => {
    win.webContents.on("context-menu", (event: any, params: any) => {
        const menu = new Menu();

        // Add each spelling suggestion
        for (const suggestion of params.dictionarySuggestions) {
            menu.append(
                new MenuItem({
                    label: suggestion,
                    click: () => win.webContents.replaceMisspelling(suggestion)
                })
            );
        }

        // Allow users to add the misspelled word to the dictionary
        if (params.misspelledWord) {
            menu.append(
                new MenuItem({
                    label: "Add to dictionary",
                    click: () => win.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
                })
            );
        }

        if (menu.items.length > 0) menu.popup();
    });
};
