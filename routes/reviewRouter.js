const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('./../controller/authController');

const router = express.Router({mergeParams: true});
//con lo de mergeparms podemos acceder a los parametros de otras rutas.

router.use(authController.protect);
router
.route('/')
.get(reviewController.getAllReviews)
.post( 
    authController.restrictTo('user'),
    reviewController.setReviewUserId,
    reviewController.createReview
    );

router
.route('/:id')
.get(reviewController.getReview)
.delete(reviewController.deleteReview)
.patch(reviewController.updateReview)

module.exports = router;