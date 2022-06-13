import express from 'express'
import cors from 'cors'
import {router} from './routes/events.route.js'
import { createTable } from './Database/createTable.js'
import { openDb } from './Database/actionsDB.js'



let app = express();
let port = process.env.PORT || 4444;

app.use(express.json());
app.use(cors())

openDb()
createTable()

app.use('/createEvent', router)

app.use('/deleteEvent', router)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port);
console.log("Server started at http://localhost:" + port);


