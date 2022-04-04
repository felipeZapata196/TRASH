const express = require ('express');
const viewsController = require('./../controller/viewsController');
const authController = require('./../controller/authController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);


router.route('/').get(authController.isLoggedIn, viewsController.prueba)

router.get('/camisetas', authController.isLoggedIn, viewsController.camisetas)
router.get('/pantalones', authController.isLoggedIn, viewsController.pantalones)


router.get('/sudaderas', authController.isLoggedIn,  viewsController.sudaderas)


router.get('/accesorios',  authController.isLoggedIn, viewsController.accesorios)







router.get('/login', authController.isLoggedIn, viewsController.getLoginForm)

router.get('/registro', viewsController.registro)

router.post('/userData', viewsController.updateUserData)

//es importante que esta ruta sea la última sino, confunde a las demás
router.get('/:id', authController.isLoggedIn, viewsController.camiseta)





module.exports = router