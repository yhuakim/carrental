const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const transferRoute = require('./routes/transfer')
const connectDB = require('./config/db')

const app = express();

dotenv.config({
    path: './config/config.env'
})

connectDB();

app.use(express.json({
    extended: false
}))

app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/transfer', transferRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})