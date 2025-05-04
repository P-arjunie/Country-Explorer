//mongodb connection 
const mongoose = require('mongoose');
require ('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    //if the connection fails, log the error
    console.error('MongoDB connection error:', err);
});

module.exports = mongoose;