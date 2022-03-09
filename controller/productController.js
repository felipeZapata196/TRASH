const mongoose = require('mongoose');
const Product = require('../modules/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')
const factory = require('./handlerFactory');
const sharp = require('sharp');
const multer = require('multer');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new AppError('Not an image! Please upload only images.', 400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});




exports.uploadProductImages = upload.fields([
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
  ]);
//solo funciona para subir images e imageCover a la vez
exports.resizeProductsImages =catchAsync(async (req, res, next) => {
  
    if (!req.files.imageCover || !req.files.images) return next(console.log("we ha"));

     // 1) Cover image
    req.body.imageCover = `product-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
    .resize(560, 780)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${req.body.imageCover}`);
 
    
    //2 images
    req.body.images = [];

    await Promise.all(
        
        req.files.images.map(async(file, i)=>{
        const filename= `product-${req.params.id}-${Date.now()}-${i+1}.jpeg`;

        await sharp(file.buffer)
            .resize(560,780)
            .toFormat('jpeg')
            .jpeg({quality:90})
            .toFile(`public/images/products/${filename}`);
        
        req.body.images.push(filename);
        })
    
    )
  
    next();
});
  
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, {path: 'reviews'})
exports.createProduct = factory.createOne(Product)
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
