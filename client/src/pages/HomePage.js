import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

import QuoteSection from "../components/QuoteSection";
import FeatureSection from "../components/FeatureSection";

const HomePage = () => {
  const [loginUser, setLoginUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);

  const totalTransaction = allTransaction.length;
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const currentStatus = totalIncomeTurnover - totalExpenseTurnover;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  useEffect(() => {
    const getAlltransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const fetchTransaction = async () => {
          return await axios.post("/transaction/get-transaction", {
            userid: user._id,
          });
        };
        const res = await fetchTransaction();
        setLoading(false);
        setAllTransaction(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAlltransaction();
  }, []);

  return (
    <Layout className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-red-50  lg:pt-16 md:pt-10 pt-6 md:pb-10 pb-16">
        <div className="lg:flex">
          {/* Left Div */}
          <div className="bg-transparent lg:w-1/2 md:w-full">
            <div className=" lg:pl-8 md:pl-0 flex justify-center pt-4">
              <h1 className="text-6xl text-center font-bold mr-1 md:mr-3">
                Hello, {loginUser && loginUser.name}
              </h1>
              <img className="w-20" src="agreement.png" alt="" />
            </div>
            <h5 className="py-4 text-2xl text-center font-semibold">
              Empower Your Finances, Navigate Your Journey <br /> Your Personal
              Expense Tracker for a Prosperous Tomorrow!
            </h5>
            <div className="flex justify-center py-4">
            <Link
                to="/transaction"
                class="mr-4 relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
              >
                <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                  <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                  <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                </span>
                <span class="relative text-white font-semibold">Expense</span>
              </Link>
              <Link
                to="/dashboard"
                class="ml-4 relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
              >
                <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
                <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                  <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                  <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
                </span>
                <span class="relative text-white font-semibold">Analyse</span>
              </Link>
            </div>
          </div>

          {/* Right Div */}
          <div className="bg-transparent lg:w-1/2 md:w-full">
            <div className=" flex justify-center pt-8 pb-12 lg:pr-8 md:pr-0">
              <div className="bg-yellow-300 shadow-xl px-8 py-10 flex-col text-center rounded-xl">
                <h2 className="mt-2 text-2xl text-gray-600 font-semibold">Current Money Status</h2>
                <h3
                  className={`${
                    currentStatus < 0
                      ? "text-red-400"
                      : currentStatus === 0
                      ? "text-black"
                      : "text-green-500"
                  } font-bold text-5xl`}
                >
                  <span className="mr-1">&#8377;</span>
                  {currentStatus}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <FeatureSection/>
        <QuoteSection />
      </div>
    </Layout>
  );
};

export default HomePage;
