import { Button, Result } from "antd";

import React from "react";

interface Props {
    setOpenAddBookModal: (openAddBookModal: boolean) => void;
}

const NoBooks: React.FC<Props> = ({setOpenAddBookModal}) => {
  return (
    <Result
      title="No books"
      extra={
        <Button style={{backgroundColor:"#001529", color:"#F2EFEA"}} onClick={() => setOpenAddBookModal(true)}>
          Add now
        </Button>
      }
    />
  );
};

export default NoBooks;
