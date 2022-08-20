import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IMUICheckboxGroupProps } from "../interfaces/IComponentProps";

const MUICheckboxGroup = (props: IMUICheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!!props.value) {
      setSelectedValues(props.value);
    }
  }, []);

  const onChangeLstnr = (value: any) => {
    const cloneSelectedValues = [...selectedValues];
    const findIdxInSelectedValue = cloneSelectedValues.findIndex(
      (val) => val === value
    );
    console.log("cloneSelectedValues", cloneSelectedValues)
    console.log("findIdxInSelectedValue", findIdxInSelectedValue)


    if (findIdxInSelectedValue === -1) {
      cloneSelectedValues.push(value);
    } else {
      cloneSelectedValues.splice(findIdxInSelectedValue, 1);
    }

    setSelectedValues([...cloneSelectedValues]);
    if (!!props.onHandleChange) {
      console.log("erueweu", [...cloneSelectedValues]);
      props.onHandleChange([...cloneSelectedValues]);
    }
  };
  return (
    <FormGroup>
      {props.lvData?.map((_lvConfig, idx) => {
        return (
          <FormControlLabel
            key={`${_lvConfig.value}_${idx}`}
            control={
              <Checkbox checked={!!selectedValues.includes(_lvConfig.value)} />
            }
            label={_lvConfig.label}
            onClick={() => {
              onChangeLstnr(_lvConfig.value);
            }}
          />
        );
      })}
    </FormGroup>
  );
};

export default MUICheckboxGroup;
