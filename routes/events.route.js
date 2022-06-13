import express from 'express'
import * as eventController from '../controllers/events.controller.js'
const router = express.Router();

router.post('/', eventController.create)

router.delete('/', eventController.deleteEvents)


export { router }