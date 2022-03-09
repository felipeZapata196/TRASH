const mongoose = require ('mongoose');
const slugify = require('slugify');



const ProductSchema = new mongoose.Schema(
{


        productType: {
            type: String,
            required: [true, 'A tour must have a price']
        },
        model: {
            type: String,
            required: [true, 'A tour must have a price']
        },
        color:{
            type: String
        },
        talla: {
            type: String
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price']
        },
        rating: {
            type: Number
        },
        marca: {
            type: String
        },
        imageCover: {
            type: String,
            required: [true, 'A tour must have a cover image']
        },
        images: [String],
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
            set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
          },
          ratingsQuantity: {
            type: Number,
            default: 0
          }
        
        
     
  
     
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}

);




ProductSchema.index({price: 1})
//lo de los indices lo que hace es que hace las busquedas más rapidas.


// esto se hace con virtual para que no se guarde la info de la base de datos de las reviews en la de products. 
//si así se hiciera, si se hicieran muchas reviews se podría sobrecargar la base de datos.
//virtual populate

ProductSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
})

const Product = mongoose.model('Product', ProductSchema);




module.exports= Product;