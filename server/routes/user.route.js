import express from 'express'
import { UserController } from '../controllers'
import { TrafficMiddleware } from '../middleware'

const router = express.Router()

router.use(TrafficMiddleware.requestCounter)

router.get('/users', UserController.getUsers)

module.exports = router
