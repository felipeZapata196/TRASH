const express = require ('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');


const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect) //este middleware se aplica sobre
//todas las lineas de codigo que estan debajo del mismo.




router.patch('/updateMyPassword', authController.updatePassword)
router.get('/me',  userController.getMe, userController.getUser)

router.patch(
    '/updateMe', 
    userController.uploadsUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe);

router.delete('/deleteMe', userController.deleteMe);


router.use(authController.restrictTo('admin'));

router
.route('/')
.get(userController.getAllUsers)



router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)



module.exports = router