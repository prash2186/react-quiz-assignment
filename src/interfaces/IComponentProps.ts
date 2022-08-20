export interface IMUIRadioGroupProps {
  value: any;
  lvData?: { label: any; value: any }[];
  onHandleChange?: (newValue: any) => void;
}

export interface IMUIDateTimePickerProps {
  value: any;
  onHandleChange?: (newValue: any) => void;
}

export interface IMUITextareaProps {
  value: any;
  onHandleChange?: (newValue: any) => void;
}

export interface IMUICheckboxGroupProps {
  value: any[];
  lvData?: { label: any; value: any }[];
  onHandleChange?: (newValue: any[]) => void;
}
