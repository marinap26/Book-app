import { Button, notification } from "antd";
import React, { useEffect, useState } from "react";

import AddBookModal from "../../modules/AddBookModal";
import Book from "../../components/Book";
import DeleteBookModal from "../../modules/DeleteBookModal";
import EditBookModal from "../../modules/EditBookModal";
import NoBooks from "../../components/NoBooks";
import {
  PlusOutlined
} from '@ant-design/icons';
import defaultBookCover from "../../images/gulfer-ergin-LUGuCtvlk1Q-unsplash.jpg";
import styles from "./Books.module.css";
import useAuth from "../../hooks/useAuth";

export interface BooksType {
  id: number;
  title: string;
  desc: string;
  price: number;
  cover: string;
  userId: number;
}

const BooksPage = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState<BooksType[]>([]);
  const [openAddBookModal, setOpenAddBookModal] = useState<boolean>(false);
  const [openEditBookModal, setOpenEditBookModal] = useState<boolean>(false);
  const [openDeleteBookModal, setOpenDeleteBookModal] =
    useState<boolean>(false);
  const [bookToEdit, setBookToEdit] = useState<BooksType>();
  const [bookToDeleteId, setBookToDeleteId] = useState<number>();

  const getBooks = async () => {
    try {
      const url = `http://localhost:5000/books`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      const { error, message, data } = await response.json();
      if (error) {
        throw new Error(message);
      }
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleAddBook = async (values: any) => {
    const userId = user?.userId;
    const url = new URL(`http://localhost:5000/books`);
    const body = {
      title: values.title,
      desc: values.desc,
      price: values.price,
      cover: defaultBookCover,
      userId: userId,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(body),
      });

      const { error, message } = await response.json();
      if (error === "true") {
        notification.error({
          message: message,
          duration: 2,
        });
      }
      setOpenAddBookModal(false);
      getBooks();
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  const handleEditBook = async (values: any) => {
    const userId = user?.userId;
    const url = new URL(`http://localhost:5000/books`);
    const body = {
      title: values.title,
      desc: values.desc,
      price: values.price,
      cover: defaultBookCover,
      bookId: bookToEdit?.id,
      userId: userId,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(body),
      });

      const { error, message } = await response.json();
      if (error === "true") {
        notification.error({
          message: message,
          duration: 2,
        });
      }
      setOpenEditBookModal(false);
      getBooks();
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  const handleDeleteBook = async (id: number) => {
    const userId = user?.userId;
    const url = new URL(`http://localhost:5000/books`);
    const body = {
      bookId: id,
      userId: userId,
    };

    try {
      await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(body),
      });
      setOpenDeleteBookModal(false);
      getBooks();
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };

  return (
    <>
      {books.length > 0 ? (
        <div className={styles.booksPage}>
          <div className={styles.addBtn}>
            <Button style={{backgroundColor:"#001529", color:"#F2EFEA", display:"flex", justifyContent:"center", alignItems:"center"}} onClick={() => setOpenAddBookModal(true)} icon={<PlusOutlined />}/>
          </div>
          <div className={styles.booksContainer}>
            {books.map((book) => {
              return (
                <div className={styles.bookCard} key={book.id}>
                  <Book
                    id={book.id}
                    title={book.title}
                    desc={book.desc}
                    price={book.price}
                    cover={book.cover}
                    book={book}
                    setOpenEditBookModal={setOpenEditBookModal}
                    setOpenDeleteBookModal={setOpenDeleteBookModal}
                    setBookToEdit={setBookToEdit}
                    setBookToDeleteId={setBookToDeleteId}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.noBooks}>
          <NoBooks setOpenAddBookModal={setOpenAddBookModal} />
        </div>
      )}

      {openAddBookModal && (
        <AddBookModal
          openAddBookModal={openAddBookModal}
          setOpenAddBookModal={setOpenAddBookModal}
          handleAddBook={handleAddBook}
        />
      )}
      {openEditBookModal && (
        <EditBookModal
          openEditBookModal={openEditBookModal}
          setOpenEditBookModal={setOpenEditBookModal}
          bookToEdit={bookToEdit}
          handleEditBook={handleEditBook}
        />
      )}
      {openDeleteBookModal && (
        <DeleteBookModal
          openDeleteBookModal={openDeleteBookModal}
          setOpenDeleteBookModal={setOpenDeleteBookModal}
          handleDeleteBook={handleDeleteBook}
          bookToDeleteId={bookToDeleteId as number}
        />
      )}
    </>
  );
};

export default BooksPage;
