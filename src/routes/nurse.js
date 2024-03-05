const express =require('express')
const router = express.Router()
const nurseControler = require('../app/controllers/NurseController')

router.get('/',nurseControler.index)

module.exports = router