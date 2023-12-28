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
  const [referenceTransactions, setReferenceTransactions] = useState([]);
  const categories = ["food", "medical", "fund", "rent", "fee", "other"];
  var frequency = "0";
  const type = "all";

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

        const fetchTransaction = async (freq) => {
          if (!freq) {
            return await axios.post("/transaction/get-transaction", {
              userid: user._id,
            });
          } else {
            frequency = freq;
            return await axios.post("/transaction/get-transaction", {
              userid: user._id,
              frequency,
              type,
            });
          }
        };

        const res = await fetchTransaction();
        const resM = await fetchTransaction("30");
        const resW = await fetchTransaction("7");

        setLoading(false);
        setAllTransaction(res.data);
        setMTransaction(resM.data);
        setWTransaction(resW.data);

        const references = res.data.map((transaction) => transaction.reference);
        setReferenceTransactions(references);
      } catch (error) {
        console.log(error);
        // message.error("Fetch Issue With Transaction");
      }
    };

    getAlltransaction();
  }, []);

  return (
    <Layout className="flex min-h-screen ">
      <div className="bg-red-200 flex-col items-center justify-between pt-4">
        <div className="mb-20 md:mb-12  pb-6 mx-8 md:mx-16 mt-8">
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
          <div className="bg-slate-50 shadow-lg px-2 pt-2 pb-1 rounded">
            <h5 className="text-center font-bold mt-4">
              Category Wise Analysis
            </h5>
            <div
              className="mt-3 mb-10 md:mb-8"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(48%, 1fr))",
                gap: "16px",
              }}
            >
              {categories.map((category) => {
                const incomeTransactionsForCategory = allTransaction.filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                );

                const amount =
                  incomeTransactionsForCategory.length > 0
                    ? incomeTransactionsForCategory.reduce(
                        (acc, transaction) => acc + transaction.amount,
                        0
                      )
                    : 0;

                return (
                  amount > 0 && (
                    <div className="card" key={category}>
                      <div className="card-body">
                        <p>{category}</p>
                        <Progress
                          strokeColor="#8e44ad"
                          percent={(
                            (amount / totalExpenseTurnover) *
                            100
                          ).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>

          <div className="mt-4 bg-slate-50 shadow-lg px-2 pt-2 pb-1 rounded">
            <h5 className="text-center font-bold mt-4">
              Reference Wise Analysis
            </h5>
            <div
              className="mt-3 mb-10 md:mb-8"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(48%, 1fr))",
                gap: "16px",
              }}
            >
              {referenceTransactions.map((reference) => {
                const transactionsForReference = allTransaction.filter(
                  (transaction) => transaction.reference === reference
                );

                const amount =
                  transactionsForReference.length > 0
                    ? transactionsForReference.reduce(
                        (acc, transaction) => acc + transaction.amount,
                        0
                      )
                    : 0;

                return (
                  amount > 0 && (
                    <div className="card" key={reference}>
                      <div className="card-body">
                        <p>{reference}</p>
                        <Progress
                          strokeColor="#34495e"
                          percent={(
                            (amount / totalTurnover) *
                            100
                          ).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashbordPage;
