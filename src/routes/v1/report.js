const router = require('express').Router()
const ReportController = require('../../controllers/v1/report-controller')

router.get('/:type', ReportController.print)

module.exports = router