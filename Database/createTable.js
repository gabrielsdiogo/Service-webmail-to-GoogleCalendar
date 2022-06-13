import { openDb } from "./actionsDB.js";


export async function createTable(){
    openDb().then(db =>{
        db.exec('CREATE TABLE IF NOT EXISTS Events ( id BINARY(16) PRIMARY KEY, eventID VARCHAR(255), invite VARCHAR(255))')
    })
}