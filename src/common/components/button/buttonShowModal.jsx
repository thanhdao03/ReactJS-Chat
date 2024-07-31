import { Button } from "antd";

export const ButtonShowModal = ({ showModal }) => {
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Update User
      </Button>
    </div>
  );
};
