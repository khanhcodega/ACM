const express =require('express')
const router = express.Router()
const nurseControler = require('../app/controllers/NurseController')

router.use('/',nurseControler.index)

module.exports = router