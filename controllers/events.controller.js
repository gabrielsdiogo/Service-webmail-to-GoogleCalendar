import {create as createEvent, deleteEvents as deleteEventID} from '../services/sendToGoogle.service.js'

export async function create(req, res, next) {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        createEvent(req, res)
    } catch (error) {
        res.status(500).send(error.message)
        next(error)
    }
}

export async function deleteEvents(req, res, next){
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        deleteEventID(req, res)
    } catch (error) {
        res.status(500).send(error.message)
        next(error)
    }
}
