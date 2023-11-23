const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");

const connectDb = require('./config/connectDb');

// config dot env file
dotenv.config();

//database call
connectDb();

//rest obj
const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/users',require('./routes/userRoute'));

//transaction
app.use('/api/v1/transaction',require('./routes/transactionRoute'));

//port
const PORT = 8080 || process.env.PORT;

//listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});