import { Form, Input, InputNumber, Modal, Select } from "antd";

import React from "react";

interface Props {
  openAddBookModal: boolean;
  setOpenAddBookModal: (openAddBookModal: boolean) => void;
  handleAddBook: (values: any) => Promise<void>;
}

const AddBookModal: React.FC<Props> = ({
  openAddBookModal,
  setOpenAddBookModal,
  handleAddBook,
}) => {
  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleAddBook(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const [form] = Form.useForm();
  const { TextArea } = Input;
  return (
    <Modal
      open={openAddBookModal}
      title="Add book"
      onOk={onOk}
      onCancel={() => setOpenAddBookModal(false)}
      okButtonProps={{
        style: {backgroundColor:"#001529", color:"#F2EFEA"}
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        labelAlign="left"
      >
        <Form.Item label="Title" name="title">
          <Input style={{ width: "80%" }} />
        </Form.Item>
        <Form.Item label="Description" name="desc">
          <TextArea rows={1} style={{ width: "80%" }} />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <Input style={{ width: "80%" }} />
        </Form.Item>
        {/* <Form.Item label="Cover" name="cover">
          <Input style={{ width: "80%" }} />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default AddBookModal;
