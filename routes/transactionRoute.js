const express = require("express");
const { getAllTransaction, addTransaction } = require("../controllers/transCtrl");


const router = express.Router();

router.get('/get-transaction',getAllTransaction);

router.post('/add-transaction',addTransaction);

module.exports = router;