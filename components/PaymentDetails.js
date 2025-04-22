import React, { useMemo } from "react";
import CustomModal from "./modals/CustomModal";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";
import { colors } from "@/utils/styles/colors";

const PaymentDetails = ({
  open,
  handleClose,
  selectedPatientData,
  handleClickEditPayment,
  handleClickDeletePayment,
}) => {
  const totalPayment = useMemo(() => {
    if (selectedPatientData?.payment_data) {
      return selectedPatientData?.payment_data.reduce(
        (acc, payment) => acc + payment.payment_amount,
        0
      );
    }
    return 0;
  }, [selectedPatientData?.payment_data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "payment_amount", //access nested data with dot notation
        header: "Amount",
        size: 200,
      },
      {
        accessorKey: "payment_type", //normal accessorKey
        header: "Payment Type",
        size: 100,
      },
      {
        accessorKey: "payment_date",
        header: "Payment Date",
        size: 150,
        Cell: ({ row, cell }) => {
          return moment(row.original.payment_date).format("DD/MM/YYYY");
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
                  handleClickEditPayment(row.original);
                }}
              >
                <Edit color="info" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  handleClickDeletePayment(row.original);
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
    data: selectedPatientData?.payment_data || [],
    enableColumnFilterModes: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableFilterMatchHighlighting: false,
    muiTableHeadProps: {
      sx: {
        "& .MuiTableRow-root": {
          backgroundColor: colors.lightGray,
        },
      },
    },
  });

  return (
    <>
      <CustomModal
        open={open}
        handleClose={() => {
          handleClose();
        }}
        modalStyle={{
          p: "0px",
          maxWidth: "max-content",
          minWidth: "max-content",
          maxHeight: "95% !important",
          overflowY: "auto",

          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        <Stack alignItems={"center"} width={"100%"} p={"18px 24px"}>
          <Typography
            sx={{
              width: "100%",
              fontSize: "24px",
              fontWeight: 600,
              color: colors.titleColor,
            }}
          >
            Payment of "{selectedPatientData?.patient_name}"
          </Typography>

          <Typography
            sx={{
              mb: "12px !important",
              width: "100%",
              fontSize: "20px",
              fontWeight: 600,
              color: colors.titleColor,
              textAlign: "right",
            }}
          >
            Total Payment: ₹{totalPayment}
          </Typography>
          <Box>
            <MaterialReactTable table={table} />
          </Box>
        </Stack>
      </CustomModal>
    </>
  );
};

export default PaymentDetails;
