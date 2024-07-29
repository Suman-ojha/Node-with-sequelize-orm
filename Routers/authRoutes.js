const authController = require('../Controller/authController')
const router = require('express').Router();

router.post('/register' , authController.register)
router.post('/login' , authController.signin)


module.exports = router;