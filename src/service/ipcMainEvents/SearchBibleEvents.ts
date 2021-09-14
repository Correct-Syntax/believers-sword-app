const isDevelopment = process.env.NODE_ENV !== "production";
const config = require("./../../db.config");
const knex = require("knex")(isDevelopment ? config.development : config.production);

export const searchBibleSubmitButton = async (win: any, payload: any) => {
    try {
        let result = knex(payload.bibleVersion)
            .where("t", "like", `%${payload.q}%`)
            .offset((payload.page - 1) * payload.limit);

        let count = knex(payload.bibleVersion)
            .first()
            .count("id as count")
            .where("t", "like", `%${payload.q}%`);

        if (payload.limit > 0) {
            result.limit(payload.limit);
        }

        if (payload.bibleBook != "all") {
            result.where("b", payload.bibleBook);
            count.where("b", payload.bibleBook);
        }

        let response: any = {};
        await count.then((count: any) => {
            response.count = count.count;
        });
        await result.then((rows: any) => {
            response.result = rows;
        });
        win.webContents.send("searchBibleSubmitButtonResult", response);
    } catch (e) {
        // eslint-disable-next-line
        console.log(e);
    }
};
