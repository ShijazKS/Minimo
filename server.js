const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");

const connectDb = require("./config/connectDb");

// config dot env file
dotenv.config();

//database call
connectDb();

//rest obj
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// app.get("/", (req,res) => {
//     res.json("Hello");
// })

//routes
app.use("/users", require("./routes/userRoute"));

//transaction
app.use("/transaction", require("./routes/transactionRoute"));

// // static files
// app.use(express.static(path.join(__dirname, '/client/build')));

// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname , '/client/build/index.html'));
// });

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//port
const PORT = 8080 || process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
