import * as React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { IMUITextareaProps } from "../interfaces/IComponentProps";

const MUITextarea = (props:IMUITextareaProps) => {
  const [value, setValue] = React.useState<any>("");

  React.useEffect(() => {
    if (!!props.value) {
      setValue(props.value);
    }
  }, []);

  return (
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Empty"
      value={value}
      style={{ minWidth: 300, minHeight:100 }}
      onChange={(e) => {
        setValue(e.target.value);
        if(!!props.onHandleChange){
            props.onHandleChange(e.target.value);
        }
      }}
    />
  );
};

export default MUITextarea;
