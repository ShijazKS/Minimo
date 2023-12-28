import React from 'react'
import axios from "axios";
import { message} from "antd";

export const getAllTransaction = async ({ frequency, selectedDate, type,setLoading,setAllTransaction,setTableKey}) => {
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
