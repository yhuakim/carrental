const dotenv = require('dotenv');
const mongoose = require('mongoose');

/* dotenv.config({
    path: './config.env'
}) */

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