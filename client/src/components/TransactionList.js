import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Select, Table, message, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

import { getAllTransaction } from "../utils/TransFunctions";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalForm from "./ModalForm";

const { RangePicker } = DatePicker;

const TransactionList = () => {
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [tableKey, setTableKey] = useState(0); // Use a state variable for the key
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [editable, setEditable] = useState(null);
  const [showEModal, setShowEModal] = useState(false);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transaction/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      responsive: ["lg"],
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["md"],
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["lg"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <button
            className="pr-2"
            onClick={() => {
              setEditable(record);
              console.log(record);
              setShowEModal(true);
            }}
          >
            <FaEdit className="text-lg text-blue-600" />
          </button>
          <Popconfirm
            okButtonProps={{ style: { backgroundColor: "blue" } }}
            cancelButtonProps={{ style: { color: "black" } }}
            title="Delete the transaction"
            description="Are you sure?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">
              <MdDelete className="text-lg text-red-600" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  //get all transaction
  useEffect(() => {
    getAllTransaction({
      frequency,
      selectedDate,
      type,
      setLoading,
      setAllTransaction,
      setTableKey,
    });
  }, [frequency, selectedDate, type]);

  const rowClassName = (record) => {
    return record.type === "income" ? "income-row" : "expense-row";
  };

  const paginationConfig = {
    pageSize: 5, // Set the number of rows per page
  };

  return (
    <div>
      <div className="flex item-center justify-between px-2 mx-4">
        <div className="">
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last Week</Select.Option>
            <Select.Option value="30">Last Month</Select.Option>
            <Select.Option value="365">Last Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
        </div>
        {frequency === "custom" && (
          <RangePicker
            value={selectedDate}
            onChange={(values) => setSelectedDate(values)}
          />
        )}
        <div className="">
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>
      </div>
      <Table
        className="m-4"
        key={tableKey}
        columns={columns}
        dataSource={allTransaction}
        pagination={paginationConfig}
        rowClassName={rowClassName}
      />
      <ModalForm
        showModal={showEModal}
        setShowModal={setShowEModal}
        editable={editable}
        setEditable={setEditable}
      />
    </div>
  );
};
export default TransactionList;
