"use client";

import { useState } from "react";
import { colors } from "@/utils/styles/colors";
import { TextField, Typography } from "@mui/material";

const CustomInput = ({
  startAdornment,
  placeholder = "",
  label = "",
  required = false,
  width = "250px",
  onKeyDown = () => {},
  onChange = () => {},
  value = "",
  multiline = false,
  ...rest
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <>
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            color: colors.titleColor,
            mb: "4px !important",
            fontWeight: 500,
          }}
        >
          {label}

          {required && (
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
          )}
        </Typography>
      )}
      <TextField
        label=""
        placeholder={placeholder}
        sx={{ m: 1, width: width, "& fieldset": { display: "none" } }}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onKeyDown={onKeyDown}
        slotProps={{
          input: {
            ...(startAdornment ? { startAdornment: startAdornment } : {}),
            sx: {
              height: multiline ? "auto" : "40px",
              padding: "0 10px !important",
              borderRadius: "8px",
              border: `1px solid ${
                isFocus ? colors.primaryColor : colors.borderColor
              }`,
              boxShadow: isFocus
                ? `0px 0px 7px ${colors.lightPrimary}`
                : "none",

              "& input": {
                padding: "0px !important",
                fontSize: "14px",
                color: colors.titleColor,
              },
            },
          },
        }}
        multiline={multiline}
        {...rest}
      />
    </>
  );
};

export default CustomInput;
