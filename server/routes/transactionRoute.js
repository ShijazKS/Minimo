const express = require("express");
const { getAllTransaction, addTransaction,editTransaction,deleteTransaction } = require("../controllers/transCtrl");


const router = express.Router();

router.post('/get-transaction',getAllTransaction);

router.post('/add-transaction',addTransaction);

router.post('/edit-transaction',editTransaction);

router.post('/delete-transaction',deleteTransaction);


module.exports = router;