"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, IconButton, InputAdornment, Stack } from "@mui/material";
import CustomInput from "./inputs/CustomInput";
import {
  Add,
  Delete,
  Edit,
  Search,
  ViewAgenda,
  Visibility,
} from "@mui/icons-material";
import PrimaryButton from "./buttons/PrimaryButton";
import UserForm from "./UserForm";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import moment from "moment";
import DeletePatient from "./DeletePatient";
import PaymentForm from "./PaymentForm";
import PaymentDetails from "./PaymentDetails";

const UserList = () => {
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewPaymentOpen, setIsViewPaymentOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  // const [search, setSearch] = useState("");

  const handleCloseAddPatient = () => {
    setOpenAddPatient(false);
    setSelectedPatientData(null);
    setIsEditOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/patients?id=${selectedPatientData.id}`
      );
      setIsDeleteOpen(false);
      setSelectedPatientData(null);
      getPatientList();
    } catch (error) {}
  };

  const getPatientList = async () => {
    try {
      const response = await axios.get("/api/patients");
      setPatientsList(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getPatientList();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "patient_name", //access nested data with dot notation
        header: "Patient Name",
        size: 200,
      },
      {
        accessorKey: "age", //normal accessorKey
        header: "Age",
        size: 100,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        size: 100,
      },
      {
        accessorKey: "mobile_no",
        header: "Mobile No.",
        size: 150,
      },
      {
        accessorKey: "starting_date",
        header: "Starting Date",
        size: 150,
        Cell: ({ row, cell }) => {
          return moment(row.original.starting_date).format("DD/MM/YYYY");
        },
      },
      {
        accessorKey: "payment_data",
        header: "Payments",
        size: 100,
        enableSorting: false,
        Cell: ({ row, cell }) => {
          return (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"4px"}
            >
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setSelectedPatientData(row.original);
                  setIsViewPaymentOpen(true);
                }}
              >
                <Visibility color="action" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setSelectedPatientData(row.original);
                  setIsAddPaymentOpen(true);
                }}
              >
                <Add color="info" />
              </IconButton>
            </Stack>
          );
        },
      },
      {
        accessorKey: "id",
        header: "Actions",
        size: 100,
        enableSorting: false,
        Cell: ({ row, cell }) => {
          return (
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={"4px"}
            >
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setSelectedPatientData(row.original);
                  setIsEditOpen(true);
                }}
              >
                <Edit color="info" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setSelectedPatientData(row.original);
                  setIsDeleteOpen(true);
                }}
              >
                <Delete color="error" />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: patientsList,
    enableColumnFilterModes: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableFilterMatchHighlighting: false,
    enablePagination: true,
  });

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"12px"}
      >
        {/* <CustomInput
          placeholder="Search patients"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        /> */}
        <PrimaryButton onClick={() => setOpenAddPatient(true)}>
          Add Patient
        </PrimaryButton>
      </Stack>

      <Box>
        <MaterialReactTable table={table} />
      </Box>

      <UserForm
        open={openAddPatient}
        handleClose={handleCloseAddPatient}
        editData={selectedPatientData}
        isEditOpen={isEditOpen}
        fetchData={getPatientList}
      />

      <DeletePatient
        open={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
        confirmDelete={handleConfirmDelete}
      />

      <PaymentForm
        open={isAddPaymentOpen}
        handleClose={() => {
          setIsAddPaymentOpen(false);
          setSelectedPatientData(null);
        }}
        selectedPatientData={selectedPatientData}
        getPatientList={getPatientList}
      />

      <PaymentDetails
        open={isViewPaymentOpen}
        handleClose={() => {
          setIsViewPaymentOpen(false);
          setSelectedPatientData(null);
        }}
        selectedPatientData={selectedPatientData}
      />
    </>
  );
};

export default UserList;
