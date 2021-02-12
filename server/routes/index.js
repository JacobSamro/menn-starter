import express from 'express'
import { Controller } from '../controllers'
import { Middleware } from '../middleware'

const router = express.Router()

router.get('/fruits', Controller.sendFruits)

router.use(Middleware.reqType)

router.get('/fruits2', Controller.sendFruits)

module.exports = router
