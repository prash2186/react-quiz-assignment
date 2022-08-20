import React from "react";
import MUICheckbox from "../components/muiCheckboxGroup";
import MUIDateTimePicker from "../components/muiDateTimePicker";
import MUIRadioGroup from "../components/muiRadioGroup";
import MUITextarea from "../components/muiTextarea";
import {
  IMUICheckboxGroupProps,
  IMUIDateTimePickerProps,
  IMUIRadioGroupProps,
  IMUITextareaProps,
} from "../interfaces/IComponentProps";

const ComponentSelector = (
  type: "Radio" | "Date" | "Textarea" | "Checkbox",
  props:
    | IMUIRadioGroupProps
    | IMUIDateTimePickerProps
    | IMUITextareaProps
    | IMUICheckboxGroupProps
) => {
  switch (type) {
    case "Radio":
      return <MUIRadioGroup {...(props as IMUIRadioGroupProps)} />;

    case "Date":
      return <MUIDateTimePicker {...(props as IMUIDateTimePickerProps)} />;

    case "Textarea":
      return <MUITextarea {...(props as IMUITextareaProps)} />;

    case "Checkbox":
      return <MUICheckbox {...(props as IMUICheckboxGroupProps)} />;
    default:
      return null;
  }
};

export default ComponentSelector;
