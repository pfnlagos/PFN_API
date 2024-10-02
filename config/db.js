const mongoose = require('mongoose')
//Database connection
const connectDb = async() => {
    // await mongoose.connect( "mongodb://localhost:27017/pfn_blog_data",
    // await mongoose.connect( "mongodb+srv://franklin:1234@cluster0.cckl6.mongodb.net/test",
  mongoose.set('strictQuery', true);
   await mongoose.connect(process.env.MONGO_URI,
       {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         // useFindAndModify: false,
         // useCreateIndex: true
       },(err) => {
         if (err){
           console.log("Error connecting to database... " + err)
         }else{
           console.log("Database connection succesful!")
         }
       }
     );
   }
   module.exports = connectDb





