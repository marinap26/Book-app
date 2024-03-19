import { Avatar, Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { BooksType } from "../pages/Books/BooksPage";
import React from "react";
import styles from "../pages/Books/Books.module.css";

const { Meta } = Card;

interface Props {
  id: number;
  title: string;
  desc: string;
  price: number;
  cover: string;
  book: BooksType;
  setOpenEditBookModal: (openAddBookModal: boolean) => void;
  setOpenDeleteBookModal: (openDeleteBookModal: boolean) => void;
  setBookToEdit: (bookToEdit: BooksType) => void;
  setBookToDeleteId: (bookToDeleteId: number) => void;
}

const Book: React.FC<Props> = ({
  id,
  title,
  desc,
  price,
  cover,
  book,
  setBookToEdit,
  setOpenDeleteBookModal,
  setOpenEditBookModal,
  setBookToDeleteId,
}) => {
  const handleEditClick = () => {
    setOpenEditBookModal(true);
    setBookToEdit(book);
  };

  const handleDeleteClick = () => {
    setBookToDeleteId(id);
    setOpenDeleteBookModal(true);
  };

  const bookTitle: React.ReactNode = (
    <div className={styles.bookTitle}>
      <span>{title}</span>
      <span>${price}</span>
    </div>
  );

  const bookDesc: React.ReactNode = (
    <div className={styles.bookDesc}>
     {desc}
    </div>
  );

  return (
    <Card
      style={{ width: "300px", height: "200px" }}
      cover={<img alt={title} src={cover} />}
      actions={[
        <EditOutlined key="edit" onClick={handleEditClick} />,
        <DeleteOutlined key="delete" onClick={handleDeleteClick} />,
      ]}
    >
      <Meta title={bookTitle} description={bookDesc} />
    </Card>
  );
};

export default Book;
