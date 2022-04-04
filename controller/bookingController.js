const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../modules/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async(req, res, next) =>{

    const product = await Product.findById(req.params.productId);
    

    const session =  await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/`,
        cancel_url: `${req.protocol}://${req.get('host')}/product/${product.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.productId,
        line_items: [
            {
            //implementar lo de la pagina cuando ya tengas la pagina subida
                name: `${product.model} Name`,
                 amount: product.price * 100,
                currency: 'eur',
                quantity: 1
            }
        
        ]

    });

    res.status(200).json({
        status: 'succes',
        session
    })
}); 