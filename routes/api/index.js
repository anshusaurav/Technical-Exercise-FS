
const express = require('express')
const router = express.Router()
const fileRouter = require('./file.routes')
router.get('/status', (req, res) => { res.send({ status: 'OK' }) }) // api status
router.use('/uploads', fileRouter)

module.exports = router
