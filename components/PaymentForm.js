import { useState } from "react";
import CustomModal from "./modals/CustomModal";
import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "@/utils/styles/colors";
import CustomInput from "./inputs/CustomInput";
import { addOnlyNumbers } from "@/utils/commonFiles/commonFunctions";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { Close } from "@mui/icons-material";
import axios from "axios";

const PaymentForm = ({
  open,
  handleClose,
  selectedPatientData,
  getPatientList,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [paymentData, setPaymentData] = useState({
    payment_date: dayjs(new Date()),
    payment_amount: "",
    payment_type: "cash",
  });

  const clearState = () => {
    setPaymentData({
      payment_date: dayjs(new Date()),
      payment_amount: "",
      payment_type: "cash",
    });
  };

  const handleValidateData = () => {
    if (!paymentData.payment_date) {
      setErrorMessage("Please select payment date");
      return false;
    }
    if (!paymentData.payment_amount) {
      setErrorMessage("Please enter payment amount");
      return false;
    }
    if (!paymentData.payment_type) {
      setErrorMessage("Please select payment type");
      return false;
    }
    return true;
  };

  const handleSavePayment = async () => {
    const isValid = handleValidateData();
    if (!isValid) return;

    try {
      const response = await axios.patch("/api/patients", {
        // ...selectedPatientData,
        id: selectedPatientData.id,
        payment_data: {
          payment_date: paymentData.payment_date,
          payment_amount: paymentData.payment_amount,
          payment_type: paymentData.payment_type,
        },
        // [
        //   ...selectedPatientData.payment_data,
        //   {
        //     payment_date: paymentData.payment_date,
        //     payment_amount: paymentData.payment_amount,
        //     payment_type: paymentData.payment_type,
        //   },
        // ],
      });

      getPatientList();
      setSuccessMessage("Payment added successfully");
      clearState();
      handleClose();
    } catch (error) {
      setErrorMessage("Error adding payment");
    }
  };

  return (
    <>
      <CustomModal
        open={open}
        handleClose={() => {
          handleClose();
          clearState();
        }}
        modalStyle={{
          p: "0px",
          maxWidth: "40%",
          minWidth: "40%",
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={"16px 22px"}
          borderBottom={`1px solid ${colors.borderColor}`}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 600,
              color: colors.titleColor,
            }}
          >
            Add Payment of "{selectedPatientData?.patient_name}"
          </Typography>

          <Box
            sx={{ cursor: "pointer" }}
            onClick={() => {
              clearState();
              handleClose();
            }}
          >
            <Close />
          </Box>
        </Stack>

        <Box
          p={"16px 22px"}
          borderBottom={`1px solid ${colors.borderColor}`}
          mt={"12px"}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={"12px"}
            flexWrap={"wrap"}
          >
            <Box width="100%">
              <Typography
                sx={{
                  fontSize: "14px",
                  color: colors.titleColor,
                  mb: "4px !important",
                  fontWeight: 500,
                }}
              >
                Payment Date
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.errorColor,
                    marginLeft: "2px !important",
                    fontSize: "14px",
                  }}
                >
                  *
                </Typography>
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  value={paymentData.payment_date}
                  onChange={(value) => {
                    setPaymentData({
                      ...paymentData,
                      payment_date: value,
                    });
                  }}
                  sx={{
                    width: "100%",

                    "& .MuiPickersInputBase-root": {
                      width: "100%",
                      height: "40px",
                      padding: "0 10px !important",
                      borderRadius: "8px",
                      border: `1px solid ${colors.borderColor}`,
                    },

                    "& .MuiPickersSectionList-root": {
                      padding: "0px !important",
                    },

                    "& fieldset": {
                      display: "none",
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>
            <Box width={"100%"}>
              <CustomInput
                placeholder="Amount"
                label="Amount"
                required={true}
                width="100%"
                value={paymentData.payment_amount}
                onKeyDown={addOnlyNumbers}
                onChange={(e) =>
                  setPaymentData({
                    ...paymentData,
                    payment_amount: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="calc(50% - 8px)">
              <FormControl>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: colors.titleColor,
                    mb: "4px !important",
                    fontWeight: 500,
                  }}
                >
                  Payment Type
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.errorColor,
                      marginLeft: "2px !important",
                      fontSize: "14px",
                    }}
                  >
                    *
                  </Typography>
                </Typography>
                <RadioGroup
                  value={paymentData.payment_type}
                  onChange={(e) => {
                    setPaymentData({
                      ...paymentData,
                      payment_type: e.target.value,
                    });
                  }}
                  row
                  sx={{
                    gap: "24px !important",

                    "& .MuiRadio-root": {
                      padding: "0px !important",
                      marginRight: "2px !important",
                    },
                  }}
                >
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash"
                    sx={{
                      "& svg": {
                        fill:
                          paymentData.payment_type === "cash"
                            ? colors.primaryColor
                            : colors.borderColor,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="online"
                    control={<Radio />}
                    label="Online"
                    sx={{
                      "& svg": {
                        fill:
                          paymentData.payment_type === "online"
                            ? colors.primaryColor
                            : colors.borderColor,
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              gap={"12px"}
              p={"16px 22px"}
            >
              <PrimaryButton onClick={handleSavePayment}>Save</PrimaryButton>
              <SecondaryButton
                onClick={() => {
                  clearState();
                  handleClose();
                }}
              >
                Cancel
              </SecondaryButton>
            </Stack>
          </Stack>
        </Box>
      </CustomModal>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errorMessage.length > 0 || successMessage.length > 0}
        autoHideDuration={4000}
        onClose={() => {
          setErrorMessage("");
          setSuccessMessage("");
        }}
        slots={{
          transition: Slide,
        }}
      >
        <Alert
          onClose={() => {
            setErrorMessage("");
            setSuccessMessage("");
          }}
          severity={errorMessage.length > 0 ? "warning" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          <Typography ml={"8px !important"} fontSize={"14px"}>
            {errorMessage || successMessage}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default PaymentForm;
