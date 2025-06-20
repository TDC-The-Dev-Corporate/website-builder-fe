"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Box, Typography } from "@mui/material";

interface PhoneNumberInputProps {
  value: string;
  onChange: (phone: string) => void;
  touched?: boolean;
  error?: string | undefined;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  touched,
  error,
}) => {
  return (
    <Box
      sx={{
        "& .react-tel-input": {
          width: "100%",
        },
        "& .form-control": {
          width: "100%",
          height: "56px",
          backgroundColor: "rgba(255, 255, 255, 0.05) !important",
          color: "white !important",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.4)",
          },
          "&:focus": {
            borderColor: "rgba(255, 255, 255, 0.7)",
            boxShadow: "none",
          },
        },
        "& .country-list": {
          backgroundColor: "#1e293b",
          color: "white",
          "& .country": {
            color: "white !important",
            backgroundColor: "#1e293b !important",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1) !important",
            },
          },
          "& .highlight": {
            backgroundColor: "rgba(255, 255, 255, 0.1) !important",
          },
        },
        "& .selected-flag": {
          backgroundColor: "transparent !important",
          "&:hover, &:focus": {
            backgroundColor: "rgba(255, 255, 255, 0.1) !important",
          },
        },
        "& .flag-dropdown": {
          backgroundColor: "transparent",
          border: "none",
        },
        "& .search": {
          backgroundColor: "#1e293b !important",
          "& input": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },
        },
      }}
    >
      <PhoneInput
        country={"us"}
        value={value}
        onChange={(phone) => onChange("+" + phone)}
        inputProps={{
          required: true,
        }}
        enableSearch
        disableSearchIcon
        searchStyle={{
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />
      {touched && error && (
        <Typography
          variant="caption"
          sx={{
            color: "error.main",
            mt: 0.5,
            ml: 2,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default PhoneNumberInput;
