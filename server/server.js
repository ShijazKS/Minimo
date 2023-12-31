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
app.use(
  cors({
    // origin: ["http://localhost:8080/"],
    origin: ["https://minimotracker.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send('<h2><a style="text-decoration:none" href="https://minimotracker.vercel.app">Expense Tracker</a></h2>');
});

//routes
app.use("/users", require("./routes/userRoute"));

//transaction
app.use("/transaction", require("./routes/transactionRoute"));

//port
const PORT = 8080 || process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
