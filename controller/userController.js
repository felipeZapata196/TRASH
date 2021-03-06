
const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const User = require('./../modules/usuarioModel');
const AppError =  require('./../utils/appError');
const factory = require('./handlerFactory');
const sharp = require('sharp');

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

exports.uploadsUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async(req, res, next) => {
    if(!req.file) return next();
    
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/images/users/${req.file.filename}`);

    next();
});

const filterObj = (obj, ...allowedFields) =>{
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    })
    return newObj;
} 


exports.updateMe =catchAsync (async (req, res, next) => {

    //1 create error if user posts password data
    if(req.body.password || req.body.passwordConfirm){
        return next( AppError('this route is not for password updates', 400))
    }

    //2 filtra los campos que no se van a permitir modificiar
    const filteredBody = filterObj(req.body, 'name', 'email');
    if(req.file) filteredBody.photo = req.file.filename;

    //3 update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { 
        new: true, 
        runValidators: true
    });
    
    res.status(200).json({
        status:'success'
    })
});




exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'esta ruta todavía no existe'
    })
};

exports.getMe = (req, res ,next) => {
    req.params.id = req.user.id;
}

exports.deleteMe = catchAsync(async(req, res, next)=>{
    await User.findByIdAndUpdate(req.user.id, {active: false});
    res.status(204).json({
        status: 'succes',
        data: null
    })
})

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
