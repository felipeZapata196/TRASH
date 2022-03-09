const mongoose = require('mongoose');
const Product = require('./../modules/productModel');

const reviewSchema = new mongoose.Schema(
    {
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5

    },
    createdAt: {
        tpye: Date
        
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
       required: [true, 'Review must belong to a tour']

    }, 
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']

    }
},
    {
        
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
      
    

}
);

//para evitar que un usuario pueda hacer mas de una review por tour
reviewSchema.index({product: 1, user: 1}, {unique:true})


//para hacer desplegar la informacion de los usuarios en las reviews
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path:'user',
        select:'name'
        
        
    // }).populate({
        
      //  path: 'product',
       // select: 'productName'
     })
     next()
});


//para calcular la media de los reviews for each tour.


reviewSchema.statics.calcAverageRatings = async function(productId) {
    const stats = await this.aggregate([
        {
            $match: {product: productId}
        },
        {
        $group: {
            _id: '$product',
            nRating: {$sum: 1},
            avgRating: { $avg: '$rating'}
        }
        }
    ]);

    if(stats.length>0){
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    }else{
        await Product.findByIdAndUpdate(productId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        })
    }
}

reviewSchema.post('save', function(){
    this.constructor.calcAverageRatings(this.product);
});

reviewSchema.pre(/^findOneAnd/, async function(next){
    this.r = await this.findOne();
    next();
})

reviewSchema.post(/^findOneAnd/, async function() {
    await this.r.constructor.calcAverageRatings(this.r.product)
})


// repasar lo de arriba mañana. en definitiva lo que estan haciendo todas estas funciones es coger las puntuaciones de un tour y hacer una media.

const Review = mongoose.model('Review', reviewSchema);



module.exports = Review;