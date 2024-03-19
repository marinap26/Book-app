import { Form, Input, InputNumber, Modal, Select } from "antd";

import { BooksType } from "../pages/Books/BooksPage";
import React from "react";

interface Props {
  openEditBookModal: boolean;
  setOpenEditBookModal: (openAddBookModal: boolean) => void;
  bookToEdit: BooksType | undefined;
  handleEditBook: (values: any) => Promise<void>;
}

const EditBookModal: React.FC<Props> = ({
  openEditBookModal,
  setOpenEditBookModal,
  bookToEdit,
  handleEditBook,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleEditBook(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      open={openEditBookModal}
      title="Edit book"
      onOk={onOk}
      onCancel={() => setOpenEditBookModal(false)}
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
        initialValues={{
          title: bookToEdit?.title,
          desc: bookToEdit?.desc,
          price: bookToEdit?.price,
          cover: bookToEdit?.cover,
        }}
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

export default EditBookModal;
