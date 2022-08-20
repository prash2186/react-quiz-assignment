import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { IMUIDateTimePickerProps } from "../interfaces/IComponentProps";
import moment from "moment";

const MUIDateTimePicker = (props: IMUIDateTimePickerProps) => {
  const [value, setValue] = React.useState<any>(null);

  React.useEffect(() => {
    if (!!props.value) {
      setValue(props.value);
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => (
          <TextField {...props} disabled style={{ background: "white" }} />
        )}
        label=""
        value={value}
        onChange={(newValue) => {
          const formattedDTValue = moment(newValue).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          setValue(formattedDTValue);
          if (!!props.onHandleChange) {
            props.onHandleChange(formattedDTValue);
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default MUIDateTimePicker;
