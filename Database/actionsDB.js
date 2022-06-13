import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function openDb () {
    return open({
      filename: './Database/database.db',
      driver: sqlite3.Database
    })
  }

async function create(body){
    openDb().then(db =>{
        db.run(
            'INSERT INTO Events (id, eventID, invite) VALUES (?, ?, ?)',
            body.id,
            body.eventID,
            body.invite
        )
    })
}

async function remove(id){
   openDb().then(db =>{
        db.run(
            'DELETE FROM Events WHERE invite = ?',
            id
        )
   })
}

async function getEventID(evenue) {
    return openDb().then(db =>{
        return db.get('SELECT eventID FROM "Events" WHERE invite= ?', evenue).then(res => res)
    })
}


export { create, remove, getEventID, openDb }




