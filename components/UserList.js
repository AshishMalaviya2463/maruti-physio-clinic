"use client";

import { useEffect, useState } from "react";
import { InputAdornment, Stack } from "@mui/material";
import CustomInput from "./inputs/CustomInput";
import { Search } from "@mui/icons-material";
import PrimaryButton from "./buttons/PrimaryButton";
import UserForm from "./UserForm";
import axios from "axios";

const UserList = () => {
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  const [search, setSearch] = useState("");

  const handleCloseAddPatient = () => {
    setOpenAddPatient(false);
  };

  const getPatientList = async () => {
    try {
      const response = await axios.get("/api/patients");
      setPatientsList(response.data.data);

      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPatientList();
  }, []);

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"12px"}
      >
        <CustomInput
          placeholder="Search patients"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
        <PrimaryButton onClick={() => setOpenAddPatient(true)}>
          Add Patient
        </PrimaryButton>
      </Stack>

      <UserForm open={openAddPatient} handleClose={handleCloseAddPatient} />
    </>
  );
};

export default UserList;
