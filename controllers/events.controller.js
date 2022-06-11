const CreateEventOnCalendar = require("../services/sendToGoogle.service")

async function create(req, res, next) {
    

    try {
        let ret = await CreateEventOnCalendar.create(req);
        if(ret == undefined) throw Error("Error")
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(201).json(ret)
    } catch (error) {
        res.status(500).send(error.message)
        next(error)
    }
}

module.exports = {create}