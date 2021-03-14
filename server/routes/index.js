import express from 'express'

const router = express.Router()


router.use('/user', require('./User.route'))

module.exports = router
