const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pfnlagosstate:pfnlagosstate1234@cluster0.hnnly1e.mongodb.net/pfnlagosstate?retryWrites=true&w=majority';

const connectDb = async () => {
    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connection successful!");
    } catch (err) {
        console.error("Error connecting to database: ", err);
    }
};

module.exports = connectDb;
