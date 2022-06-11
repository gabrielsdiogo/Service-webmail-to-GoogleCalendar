const express = require("express");
const cors = require('cors')
const createEventRouter = require('./routes/events.route')


let app = express();
let port = process.env.PORT || 4444;

app.use(express.json());
app.use(cors())


app.use('/createEvent', createEventRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port);
console.log("Server started at http://localhost:" + port);


