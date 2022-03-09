const catchAsync = require('../utils/catchAsync');
const Product = require('./../modules/productModel');
const authController = require('./authController');
const User = require('./../modules/usuarioModel');
const AppError =  require('./../utils/appError');
const ejs = require('ejs')


exports.prueba = async(req, res) => {
    const products =  await Product.find({productType: 'sudaderas'});
    const shirts = await Product.find({productType:'camiseta'});
    const pants = await Product.find({productType:'pantalones'})
    
    
   
    if(!products){
      return next(new AppError('no se encuentra el producto', 404));
    }

    res.status(200)
    .set
    ('Content-Security-Policy',
    "connect-src 'self' http://localhost:3000/")
    .render('homePage',{
      productList: products,
      shirtList: shirts,
      pantList: pants,
      user: res.locals.user
        
    } );

};




exports.camisetas = async(req, res) => {
  const camisetas =  await Product.find({productType: 'camiseta'});


  if(!camisetas){
    return next(new AppError('no se encuentra el producto', 404));
  }

  

  res.render('camisetas',{
    productList: camisetas,
    user: res.locals.user
      
  } );

}; 




exports.camiseta = async(req, res) => {
  const camiseta=  await Product.findById(req.params.id)


  if(!camiseta){
    return next(new AppError('no se encuentra el producto', 404));
  }

  

  res.render('camiseta',{
    product: camiseta,
    user: res.locals.user
      
  } );

};




exports.pantalones = async(req, res) => {
  const pantalones =  await Product.find({productType: 'pantalones'});


  if(!pantalones){
    return next(new AppError('no se encuentra el producto', 404));
  }

  

  res.render('pantalones',{
    productList: pantalones,
    user: res.locals.user
      
  } );

}; 




exports.pantalon = async(req, res) => {
  const pantalon=  await Product.findById(req.params.id)


  if(!pantalon){
    return next(new AppError('no se encuentra el producto', 404));
  }

  

  res.render('pantalon',{
    product: pantalon,
    user: res.locals.user
      
  } );

};





exports.sudaderas = async(req, res) => {
  const sudaderas =  await Product.find({productType: 'sudaderas'});


  if(!sudaderas){
    return next(new AppError('no se encuentra el producto', 404));
  }

  

  res.render('sudaderas',{
    productList: sudaderas,
    user: res.locals.user
      
  } );

}; 

exports.sudadera = async(req, res) => {
  const sudadera=  await Product.findById(req.params.id)


  if(!sudadera){
    return next(new AppError('no se encuentra el producto', 404));
  }

  

  res.render('sudadera',{
    product: sudadera,
    user: res.locals.user
      
  } );

};



exports.accesorios = async(req, res) => {
  const accesorios =  await Product.find({productType: 'accesorios'});


  if(!accesorios){
    return next(new AppError('no se encuentra el producto', 404));
  }

  

  res.render('accesorios',{
    productList: accesorios,
    user: res.locals.user
      
  } );

}; 

exports.accesorio = async(req, res) => {
  const accesorio=  await Product.findById(req.params.id)


  if(!accesorio){
    return next(new AppError('no se encuentra el producto', 404));
  }

  

  res.render('accesorio',{
    product: accesorio,
    user: res.locals.user
      
  } );

};


exports.registro = async(req, res) => {

  
  res
  .status(200)
  .set
  ( 'Content-Security-Policy',
    "connect-src 'self' http://localhost:3000/")
  .render('registro',{
    user: res.locals.user
  })
}




exports.getLoginForm = (req, res) => {
  res
  .status(200)
  .set
  ( 'Content-Security-Policy',
    "connect-src 'self' http://localhost:3000/")
  .render('login',{
    user: res.locals.user
  })
}


exports.getAccount = (req, res) => {
  res.status(200)
  .set
  ('Content-Security-Policy',
  "connect-src 'self' http://localhost:3000/")
  .render('accountPage',{
    user: res.locals.user
  })
}

exports.updateUserData = catchAsync(async(req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      ranValidators: true
    }
  )
  res.status(200).render('accountPage', {
    user: updateUser
  });
});

