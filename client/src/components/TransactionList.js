import React, { useState, useEffect } from "react";
import { Button, Popconfirm, Select, Table, message, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

const { RangePicker } = DatePicker;
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
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => handleDelete(record.key)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger">Delete</Button>
      </Popconfirm>
    ),
  },
];

const handleDelete = () => {};

const TransactionList = () => {
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [tableKey, setTableKey] = useState(0); // Use a state variable for the key
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");

  //useEfffect
  useEffect(() => {
    const getAlltransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transaction/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        const dataWithKeys = res.data.map((item) => ({
          ...item,
          key: item._id,
        }));
        setLoading(false);
        setAllTransaction(dataWithKeys);
        console.log(dataWithKeys);
        // Update the key to trigger a re-render
        setTableKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue With Transaction");
      }
    };

    getAlltransaction();
  }, [frequency, selectedDate,type]);

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
    </div>
  );
};
export default TransactionList;
