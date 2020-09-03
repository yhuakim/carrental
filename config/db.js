const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI_CLOUD, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);

    }
}

module.exports = connectDB;