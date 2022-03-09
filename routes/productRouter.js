const express = require ('express');
const productController = require('./../controller/productController');
const authController = require('./../controller/authController');
const reviewRouter = require('./reviewRouter');

const router = express.Router();


router.use('/:productId/reviews', reviewRouter)
router
.route('/')
.get( productController.getAllProducts)
.post(authController. protect, authController.restrictTo('admin'), productController.createProduct)


router
.route('/:id')
.get(productController.getProduct)
.patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.uploadProductImages,
    productController.resizeProductsImages,
    productController.updateProduct)
.delete(
    authController.protect, 
    authController.restrictTo('admin'), 
    productController.deleteProduct
    )



module.exports = router;
