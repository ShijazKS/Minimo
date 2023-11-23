import React, { useState } from "react";
import { Form, Input, Modal, Select } from "antd";

const ModalForm = ({ showModal, setShowModal }) => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const filterOption = (input, option) =>
    option.label.toLowerCase().includes(input.toLowerCase());
  return (
    <Modal
      title="Add Transaction"
      open={showModal}
      onCancel={() => setShowModal(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          {/* <Select>
              <Select.Option value="fund">Fund</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
            </Select> */}
          <Select
            showSearch
            placeholder="Select Category"
            optionFilterProp="children"
            // onChange={onChange}
            // onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: "food",
                label: "Food",
              },
              {
                value: "medical",
                label: "Medical",
              },
              {
                value: "fund",
                label: "Fund",
              },
              {
                value: "rent",
                label: "Rent",
              },
              {
                value: "fee",
                label: "Fee",
              },
              {
                value: "other",
                label: "Other",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 text-white rounded-lg p-2"
            >
              SAVE
            </button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
