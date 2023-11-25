const transModel = require("../models/transactionModel");
const moment = require("moment");

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Added");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;

    // Check if frequency, selectedDate, and type are empty
    if (!frequency && !selectedDate && !type) {
      const transactions = await transModel.find({
        userid: req.body.userid,
      });
      res.status(200).json(transactions);
      return; // Exit the function early
    }

    console.log(frequency, selectedDate, type);

    const transactions = await transModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// const getAllTransaction = async (req, res) => {
//   try {
//     const { frequency,selectedDate,type } = req.body;
//     console.log(frequency,selectedDate,type);
//     const transactions = await transModel.find({
//       ...(frequency !== 'custom' ? {
//         date: {
//           $gt : moment().subtract(Number(frequency), "d").toDate(),
//         },
//       }:{
//         date:{
//           $gte:selectedDate[0],
//           $lte:selectedDate[1],
//         }
//       }),
//       userid: req.body.userid,
//       ...(type !== 'all' && {type})
//     });
//     res.status(200).json(transactions);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

module.exports = { addTransaction, getAllTransaction };
