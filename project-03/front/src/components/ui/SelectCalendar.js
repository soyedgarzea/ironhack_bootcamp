import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";

const CssKeyboardDatePicker = withStyles({
  root: {
    color: "white",
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline": {
      "&:before": {
        borderBottom: "1px solid white",
      },
      "&:after": {
        borderBottom: "2px solid white",
      },
      "&:hover": {
        borderBottom: "1px solid white",
        "&:not(Mui-disabled)": {
          "&:before": {
            borderBottom: "2px solid white",
          },
        },
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiFormLabel-root": {
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiIconButton-root": {
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(KeyboardDatePicker);

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#343a40",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#343a40",
      },
      daySelected: {
        backgroundColor: "#343a40",
      },
      dayDisabled: {
        color: "#343a40",
      },
      current: {
        color: "#343a40",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#343a40",
      },
    },
    MuiButton: {
      textPrimary: {
        color: "#343a40",
      },
    },
  },
});

const SelectCalendar = ({ name, label, value, onChange }) => {
  return (
    <ThemeProvider theme={materialTheme}>
      <CssKeyboardDatePicker
        name={name}
        margin="normal"
        id="date-picker-dialog"
        label={label}
        format="MM/dd/yyyy"
        value={value}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        onChange={onChange}
      />
    </ThemeProvider>
  );
};

export default SelectCalendar;
