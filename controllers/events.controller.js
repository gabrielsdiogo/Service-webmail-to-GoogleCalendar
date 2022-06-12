const CreateEventOnCalendar = require("../services/sendToGoogle.service")

async function create(req, res, next) {
    

    try {
        console.log(req.body)
        res.setHeader('Access-Control-Allow-Origin', '*');
        CreateEventOnCalendar.create(req, res)
    } catch (error) {
        res.status(500).send(error.message)
        next(error)
    }
}

module.exports = {create}