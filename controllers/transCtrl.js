const transModel = require('../models/transactionModel');


const addTransaction = async(req,res) => {
    try {
        const newTransaction = new transModel(req.body);
        await newTransaction.save();
        res.status(201).send("Transaction Added");
       } catch (error) {
        console.log(error);
        res.status(500).json(error);
       } 
};

const getAllTransaction = async(req,res) => {
   try {
    const transactions = await transModel.find({});
    res.status(200).json(transactions);
   } catch (error) {
    console.log(error);
    res.status(500).json(error);
   }
};

module.exports = { addTransaction,getAllTransaction }