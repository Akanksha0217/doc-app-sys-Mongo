const express =  require('express')
const { auth, admin } = require('../middleware/auth')
const doctorController = require('../controllers/doctorController')

const router = express.Router()


router.post('/apply', auth, doctorController.applyDoctor)
router.post('/docStatus/:DoctorID', auth, admin, doctorController.docStatus)   //update on two tables
router.get('/getDoctorList', doctorController.getDoctorList)




module.exports = router