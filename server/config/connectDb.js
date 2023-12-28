const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MongoDb_url,{
            dbName:"expenseApp",
        });
        console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white);
    } catch (err) {
        console.log(`${err}`.bgRed);
    }
}


module.exports = connectDb