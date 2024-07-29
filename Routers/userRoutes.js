const router = require('express').Router();
const userController = require('../Controller/userController')
const middleware = require('../Middleware/authMiddleware')

router.get('/get-users' , middleware.chechAuth , userController.get_all_user)
router.post('/update-user' , middleware.chechAuth , userController.update_user_details)




module.exports = router;