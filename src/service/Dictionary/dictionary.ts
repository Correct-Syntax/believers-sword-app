import { ipcMain } from "electron";
import { where } from "firebase/firestore/lite";
import { Knex } from "knex";
const config = require("./../../db.config");
const dictionaryDB: Knex = require("knex")(config.dictionary);

export const dictionaryEvents = (): void => {
    ipcMain.handle("dictionarySearchWord", async (event, args: string) => {
        try {
            const result = dictionaryDB.select().from("english_dictionary");
            const count = dictionaryDB.select().from("english_dictionary");

            if (args) {
                result.whereLike('word', `${args}%`);
            }

            result.limit(100).groupBy("word");

            const data = await result.then((rows: Array<any>) => {
                return rows
            });

            const getCount = await count.count("id as count").then((data: any) => data[0].count);

            return {
                data: data,
                count: getCount
            };
        } catch (e) {
            if (e instanceof Error) {
                console.log(e)
            }
        }
    });

    ipcMain.handle("dictionaryGetMeaning", async (event, args: string) => {

        const result = dictionaryDB.select().from("english_dictionary").where('word', args);

        const data = await result.then((rows: Array<any>) => {
            return rows
        });

        return data;
    });
}