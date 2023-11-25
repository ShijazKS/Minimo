import React, { useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { Form, Input, Modal, Select, Spin, message } from "antd";
import ModalForm from "../components/ModalForm";
import axios from "axios";
import TransactionList from "../components/TransactionList";

const TransactionPage = () => {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <Layout className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-slate-200  rounded-lg lg:mx-72 lg:px-20 md:mx-10 mx-2 my-4 py-2">
        <h3 className="text-xl font-bold text-center">Transactions</h3>
        <div className="my-2">
          {/* list */}
          <TransactionList/>        
          {/* add tile */}
          <div className="flex item-center justify-end py-1 mx-6">
            <button
              className="bg-green-400 p-3 rounded-xl shadow-lg hover:bg-green-600"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <FaPlus className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <ModalForm showModal={showModal} setShowModal={setShowModal} />
    </Layout>
  );
};

export default TransactionPage;
