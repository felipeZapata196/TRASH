const Product = require('../modules/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async(req, res, next) =>{

    const tour = await Product.findById(req.params.tourId);
});