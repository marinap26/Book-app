import { Modal } from 'antd'
import React from 'react'

interface Props {
    openDeleteBookModal: boolean,
    setOpenDeleteBookModal: (openDeleteBookModal: boolean) => void
    handleDeleteBook: (id: number) => Promise<void>
    bookToDeleteId: number
}

const DeleteBookModal: React.FC <Props> = ({openDeleteBookModal, setOpenDeleteBookModal, handleDeleteBook, bookToDeleteId}) => {
  return (
    <Modal
        open = {openDeleteBookModal}
        title="Delete"
        onCancel={() => setOpenDeleteBookModal(false)}
        onOk={() => handleDeleteBook(bookToDeleteId)}
        okButtonProps={{
          style: {backgroundColor:"#001529", color:"#F2EFEA"}
        }}
    >
      Are you sure you want to delete this book?

    </Modal>
  )
}

export default DeleteBookModal
