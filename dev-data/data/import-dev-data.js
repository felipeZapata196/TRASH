const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Product = require('./../../modules/moduleProduct');


dotenv.config({path: './config.env'});



const db = process.env.DB.replace('<PASSWORD>', process.env.DBPassword);

mongoose.connect(db,{
  useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
 }).then( ()=> {

   console.log("connection succesfull")
 });







const products = JSON.parse(fs.readFileSync(`${__dirname}/shirt.json`, 'utf-8'));

const importData = async() =>{
  try {
    await Product.create(products)
    console.log("process realized succesfull")
    proces.exit()

  } catch (e) {
    console.log(err);

  }

}

const deleteData = async() =>{

  try {
    await Product.deletemany();
    console.log("process realized succesfull")
    proces.exit()

  } catch (e) {
    console.log(err);

  }
}



if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
