import { Box, Modal } from "@mui/material";

const CustomModal = ({
  children,
  modalStyle = {},
  open = false,
  handleClose = () => {},
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
    bgcolor: "#FFF",
    borderRadius: "8px",
    outline: "none",
    ...modalStyle,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
