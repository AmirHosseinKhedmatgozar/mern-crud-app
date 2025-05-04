import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Form from "./Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

function ModalUI({ open, close, setOpenModal }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
        container={document.getElementById("modal-root")}
      >
        <Box sx={style}>
          <Form
            editUser={true}
            setCloseModal={setOpenModal}
            setOpenModal={setOpenModal}
          />
        </Box>
      </Modal>
    </div>
  );
}
export default ModalUI;
