"use client";

import { useEffect, useState } from "react";
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
import { Close } from "@mui/icons-material";
import CustomModal from "./modals/CustomModal";
import { colors } from "@/utils/styles/colors";
import CustomInput from "./inputs/CustomInput";
import { addOnlyNumbers } from "@/utils/commonFiles/commonFunctions";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import axios from "axios";

const UserForm = ({ open, handleClose }) => {
  const [patientData, setPatientData] = useState({
    patient_name: "",
    age: "",
    gender: "male",
    mobile_no: "",
    address: "",
    history: "",
    on_examination: "",
    mouth_opening_measurement: "",
    treatment_given: "",
    provisional_diagnosis: "",
    chief_complains: "",
    starting_date: dayjs(new Date()),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const clearState = () => {
    setPatientData({
      patient_name: "",
      age: "",
      gender: "male",
      mobile_no: "",
      address: "",
      history: "",
      on_examination: "",
      mouth_opening_measurement: "",
      treatment_given: "",
      provisional_diagnosis: "",
      chief_complains: "",
      starting_date: dayjs(new Date()),
    });
    setErrorMessage("");
  };

  const handleValidateData = () => {
    if (
      !patientData.patient_name ||
      patientData.patient_name.trim().length <= 0
    ) {
      setErrorMessage("Please enter patient name");
      return false;
    } else if (!patientData.age) {
      setErrorMessage("Please enter age");
      return false;
    } else if (isNaN(Number(patientData.age))) {
      setErrorMessage("Please enter valid age");
      return false;
    } else if (!patientData.mobile_no) {
      setErrorMessage("Please enter mobile no");
      return false;
    } else if (isNaN(Number(patientData.mobile_no))) {
      setErrorMessage("Please enter valid mobile number");
      return false;
    } else if (!patientData.address) {
      setErrorMessage("Please enter address");
      return false;
    } else if (!patientData.history) {
      setErrorMessage("Please enter history");
      return false;
    } else if (!patientData.on_examination) {
      setErrorMessage("Please enter on examination");
      return false;
    } else if (!patientData.mouth_opening_measurement) {
      setErrorMessage("Please enter mouth opening measurement");
      return false;
    } else if (!patientData.treatment_given) {
      setErrorMessage("Please enter treatment given");
      return false;
    } else if (!patientData.provisional_diagnosis) {
      setErrorMessage("Please enter provisional diagnosis");
      return false;
    } else if (!patientData.chief_complains) {
      setErrorMessage("Please enter chief complains");
      return false;
    } else if (!patientData.starting_date) {
      setErrorMessage("Please select starting date");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    const isValid = handleValidateData();
    if (isValid) {
      try {
        const response = await axios.post("/api/patients", {
          ...patientData,
          age: Number(patientData.age),
          mobile_no: Number(patientData.mobile_no),
        });
        console.log("response", response.data);
        setSuccessMessage("Patient record created successfully.");
        clearState();
        handleClose();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <CustomModal
        open={open}
        handleClose={handleClose}
        modalStyle={{
          p: "0px",
          maxWidth: "75%",
          minWidth: "50%",
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
            Add Patient
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
            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="Patient Name"
                label="Patient Name"
                required={true}
                width="100%"
                value={patientData.patient_name}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    patient_name: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="Age (Years)"
                label="Age (Years)"
                required={true}
                width="100%"
                onKeyDown={addOnlyNumbers}
                value={patientData.age}
                onChange={(e) =>
                  setPatientData({ ...patientData, age: e.target.value })
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
                  Gender
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
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={patientData.gender}
                  onChange={(e) => {
                    setPatientData({
                      ...patientData,
                      gender: e.target.value,
                    });
                  }}
                  name="radio-buttons-group"
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
                    value="female"
                    control={<Radio />}
                    label="Female"
                    sx={{
                      "& svg": {
                        fill:
                          patientData.gender === "female"
                            ? colors.primaryColor
                            : colors.borderColor,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    sx={{
                      "& svg": {
                        fill:
                          patientData.gender === "male"
                            ? colors.primaryColor
                            : colors.borderColor,
                      },
                    }}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    sx={{
                      "& svg": {
                        fill:
                          patientData.gender === "other"
                            ? colors.primaryColor
                            : colors.borderColor,
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="Mobile No"
                label="Mobile No"
                required={true}
                width="100%"
                onKeyDown={addOnlyNumbers}
                value={patientData.mobile_no}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    mobile_no: e.target.value,
                  })
                }
              />
            </Box>

            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="Address"
                label="Address"
                required={true}
                width="100%"
                multiline={true}
                rows={2}
                value={patientData.address}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    address: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="History"
                label="History"
                required={true}
                width="100%"
                multiline={true}
                rows={2}
                value={patientData.history}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    history: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="On Examination"
                label="On Examination"
                required={true}
                width="100%"
                multiline={true}
                rows={2}
                value={patientData.on_examination}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    on_examination: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="Mouth Opening measurement"
                label="Mouth Opening measurement"
                required={true}
                width="100%"
                multiline={true}
                rows={2}
                value={patientData.mouth_opening_measurement}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    mouth_opening_measurement: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="100%">
              <CustomInput
                placeholder="Treatment Given"
                label="Treatment Given"
                required={true}
                width="100%"
                multiline={true}
                rows={2}
                value={patientData.treatment_given}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    treatment_given: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="Provisional Diagnosis"
                label="Provisional Diagnosis"
                required={true}
                width="100%"
                value={patientData.provisional_diagnosis}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    provisional_diagnosis: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="calc(50% - 8px)">
              <CustomInput
                placeholder="Chief Complains"
                label="Chief Complains"
                required={true}
                width="100%"
                value={patientData.chief_complains}
                onChange={(e) =>
                  setPatientData({
                    ...patientData,
                    chief_complains: e.target.value,
                  })
                }
              />
            </Box>
            <Box width="calc(50% - 8px)">
              <Typography
                sx={{
                  fontSize: "14px",
                  color: colors.titleColor,
                  mb: "4px !important",
                  fontWeight: 500,
                }}
              >
                Staring Date
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
                  value={patientData.starting_date}
                  onChange={(value) => {
                    setPatientData({
                      ...patientData,
                      starting_date: value,
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
          </Stack>
        </Box>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={"12px"}
          p={"16px 22px"}
        >
          <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
          <SecondaryButton
            onClick={() => {
              clearState();
              handleClose();
            }}
          >
            Cancel
          </SecondaryButton>
        </Stack>
      </CustomModal>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errorMessage.length > 0 || successMessage.length > 0}
        autoHideDuration={4000}
        onClose={() => setErrorMessage("")}
        slots={{
          transition: Slide,
        }}
      >
        <Alert
          onClose={() => setErrorMessage("")}
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

export default UserForm;
