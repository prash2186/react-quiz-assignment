import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { IMUIRadioGroupProps } from "../interfaces/IComponentProps";

const MUIRadioGroup = (props: IMUIRadioGroupProps) => {
  const [compVal, setCompVal] = useState<any>(null);

  useEffect(() => {
    if (!!props.value) {
      setCompVal(props.value);
    }
  }, []);

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={compVal}
        onChange={(e) => {
          setCompVal(e.target.value);
          if (!!props.onHandleChange) {
            props.onHandleChange(e.target.value);
          }
        }}
      >
        {!!props.lvData
          ? props.lvData.map((_lvDataConfig, idx) => {
              return (
                <FormControlLabel
                  key={`${_lvDataConfig.value}_${idx}`}
                  value={_lvDataConfig.value}
                  control={<Radio />}
                  label={_lvDataConfig.label}
                />
              );
            })
          : null}
      </RadioGroup>
    </FormControl>
  );
};

export default MUIRadioGroup;
