import React from "react";
import CustomModal from "./modals/CustomModal";
import deleteAnimationJSON from "../utils/assets/deleteAnimationJSON.json";
import Lottie from "lottie-react";
import { Box, Stack, Typography } from "@mui/material";
import { colors } from "@/utils/styles/colors";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";

const DeletePatient = ({ open, handleClose, confirmDelete }) => {
  return (
    <CustomModal
      open={open}
      handleClose={() => {
        handleClose();
      }}
      modalStyle={{
        p: "0px",
        maxWidth: "400px",
        minWidth: "400px",
      }}
    >
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
        p={"32px"}
      >
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            height: "250px",
            width: "250px",
          }}
        >
          <Lottie
            animationData={deleteAnimationJSON}
            loop={true}
            autoplay={true}
          />
        </Stack>
        <Typography
          fontSize={"20px"}
          fontWeight={600}
          textAlign={"center"}
          color={colors.titleColor}
        >
          Are you sure? <br />
          You want to delete this patient?
        </Typography>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={"12px"}
          mt={"24px !important"}
        >
          <SecondaryButton
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </SecondaryButton>
          <PrimaryButton btnColor={colors.errorColor} onClick={confirmDelete}>
            Delete
          </PrimaryButton>
        </Stack>
      </Stack>
    </CustomModal>
  );
};

export default DeletePatient;
