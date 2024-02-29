const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

router.use('/home', siteController.index)
router.use('/', siteController.index)

module.exports = router