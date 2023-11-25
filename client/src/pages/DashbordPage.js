import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { Card, Col, Progress, Row, message } from "antd";
import ProgressBar from "../components/ProgressBar";

const DashbordPage = () => {
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [mTransaction, setMTransaction] = useState([]);
  const [wTransaction, setWTransaction] = useState([]);
  var frequency = "30"; 
  const type ="all";

  //All Transaction
  const totalTransaction = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "income"
  ).length;
  const totalExpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  ).length;
  const totalIncomePersent = (totalIncomeTransaction / totalTransaction) * 100;
  const totalExpensePersent =
    (totalExpenseTransaction / totalTransaction) * 100;


  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPersent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPersent =
    (totalExpenseTurnover / totalTurnover) * 100;

  //monthly Transaction
  const totalMTurnover = mTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalMIncomeTurnover = mTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalMExpenseTurnover = mTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalMIncomeTurnoverPersent =
    (totalMIncomeTurnover / totalMTurnover) * 100;
  const totalMExpenseTurnoverPersent =
    (totalMExpenseTurnover / totalMTurnover) * 100;

  //weekly Transaction
  const totalWTurnover = wTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalWIncomeTurnover = wTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalWExpenseTurnover = wTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalWIncomeTurnoverPersent =
    (totalWIncomeTurnover / totalWTurnover) * 100;
  const totalWExpenseTurnoverPersent =
    (totalWExpenseTurnover / totalWTurnover) * 100;

  useEffect(() => {
    const getAlltransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transaction/get-transaction", {
          userid: user._id,
        });
        const resM = await axios.post("/transaction/get-transaction", {
          userid: user._id,
          frequency,
          type,
        });
        frequency="7";
        const resW = await axios.post("/transaction/get-transaction", {
          userid: user._id,
          frequency,
          type,
        });
        // console.log("=>",resW.data);
        // const resW = await axios.post("/transaction/get-transaction", {
        //   userid: user._id,
        // });
        setLoading(false);
        setAllTransaction(res.data);
        setMTransaction(resM.data);
        setWTransaction(resW.data);
      } catch (error) {
        console.log(error);
        // message.error("Fetch Issue With Transaction");
      }
    };

    getAlltransaction();
  }, []);

  return (
    <Layout className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mx-8 md:mx-16 mt-8">
        <div className="flex flex-col md:flex-row lg:mx-36">
          <ProgressBar
            mainH="Total Transaction"
            mainHv={totalTransaction}
            fHv={totalIncomeTransaction}
            sHv={totalExpenseTransaction}
            fv={totalIncomePersent}
            sv={totalExpensePersent}
            className="w-full md:w-1/2 lg:w-1/3"
          />
          <ProgressBar
            mainH="Total Turnover"
            mainHv={totalTurnover}
            fHv={totalIncomeTurnover}
            sHv={totalExpenseTurnover}
            fv={totalIncomeTurnoverPersent}
            sv={totalExpenseTurnoverPersent}
            className="w-full md:w-1/2 lg:w-1/3"
          />
        </div>
        <div className="flex flex-col md:flex-row lg:mx-36">
          <ProgressBar
            mainH="Weekly Turnover"
            mainHv={totalWTurnover}
            fHv={totalWIncomeTurnover}
            sHv={totalWExpenseTurnover}
            fv={totalWIncomeTurnoverPersent}
            sv={totalWExpenseTurnoverPersent}
            className="w-full md:w-1/2 lg:w-1/3"
          />
          <ProgressBar
            mainH="Monthly Turnover"
            mainHv={totalMTurnover}
            fHv={totalMIncomeTurnover}
            sHv={totalMExpenseTurnover}
            fv={totalMIncomeTurnoverPersent}
            sv={totalMExpenseTurnoverPersent}
            className="w-full md:w-1/2 lg:w-1/3"
          />
        </div>
      </div>
    </Layout>
  );
};

export default DashbordPage;
