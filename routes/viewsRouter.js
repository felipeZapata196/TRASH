const express = require ('express');
const viewsController = require('./../controller/viewsController');
const authController = require('./../controller/authController');

const router = express.Router();

router.get('/me', authController.protect, viewsController.getAccount);


router.route('/').get(authController.isLoggedIn, viewsController.prueba)

router.get('/camisetas',  viewsController.camisetas)
router.get('/camisetas/:id', viewsController.camiseta)

router.get('/pantalones', viewsController.pantalones)
router.get('/pantalones/:id', viewsController.pantalon)

router.get('/sudaderas', viewsController.sudaderas)
router.get('/sudaderas/:id', viewsController.sudadera)

router.get('/accesorios', authController.protect, viewsController.accesorios)
router.get('/accesorios/:id', viewsController.accesorio)


router.get('/login', authController.isLoggedIn, viewsController.getLoginForm)

router.get('/registro', viewsController.registro)

router.post('/userData', viewsController.updateUserData)





module.exports = router