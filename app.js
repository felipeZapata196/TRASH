
const morgan = require('morgan');
const AppError = require('./utils/appError');
const express =require('express');
const productRouter =require('./routes/productRouter');
const userRouter =require('./routes/userRoutes');
const reviewRouter =require('./routes/reviewRouter');
const bookingRouter =require('./routes/bookingRoutes');
const globalErrorHandler = require('./controller/errorController');
const viewsRouter= require('./routes/viewsRouter');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const hpp = require('hpp');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');



const app = express();

app.use(express.urlencoded({extended: true, limit: '10kb'}))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.static(path.join(__dirname, 'public')));



app.use(helmet());





if(process.env.NODE_ENVE === 'development'){
app.use(morgan('dev'));
}

//limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'To many requests form this IP, please try again in one hour'
});
app.use('/api', limiter);


//Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(cookieParser())

//data sanitization against NOsql query injection
app.use(mongoSanitize());


//data sanitization agaisnt

//no se porque esto me da error
//app.use(xss());

//prevent  parameter polution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'average',
        'maxGropuSize',
        'difficulty',
        'price'
    ]
}));


//para comprimir la info que se envia como response
app.use(compression())


app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
   //console.log(req.cookies)
    next()
})




app.use('/home/homePage', productRouter);
app.use('/home/users', userRouter);
app.use('/home/reviews', reviewRouter);    
app.use('/', viewsRouter);
app.use('/bookings', bookingRouter);

app.all('*', (req, res, next)=>{
    next(new AppError(`${req.originalUrl} no se encuentra en este servidor`, 404))
})


app.use(globalErrorHandler);



module.exports = app;
