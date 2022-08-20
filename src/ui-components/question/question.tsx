import React from "react";
import { Grid } from "@mui/material";
import { useQuestionsForm } from "../../hooks/useQuestionsForm";
import { IQuestion } from "../../interfaces/IQuestion";
import ComponentSelector from "../../helper/componentSelector";
import {
  IMUICheckboxGroupProps,
  IMUIDateTimePickerProps,
  IMUIRadioGroupProps,
  IMUITextareaProps,
} from "../../interfaces/IComponentProps";

const Question = () => {
  const { getQuestionData, onChangeValue } = useQuestionsForm();

  const questionData: IQuestion = getQuestionData;

  const getComponentPropsByType = (
    questionConfig: IQuestion
  ): IMUIRadioGroupProps | any => {
    switch (questionConfig.questiontype) {
      case "Radio":
        const radioCompProps: IMUIRadioGroupProps = {
          value: questionConfig.questionoption.find((val) => !!val.selected)
            ?.optionid,
          onHandleChange: (newValue) => {
            onChangeValue(newValue, questionData);
          },
          lvData: questionConfig.questionoption.map((val) => {
            return { label: val.optionvalue, value: val.optionid };
          }),
        };
        return radioCompProps;

      case "Date":
        const dateTimePickerProps: IMUIDateTimePickerProps = {
          value: questionConfig.questionoption[0]?.optionvalue || null,
          onHandleChange: (newValue) => {
            onChangeValue(newValue, questionData);
          },
        };
        return dateTimePickerProps;
      case "Textarea":
        const textAreaProps: IMUITextareaProps = {
          value: questionConfig.questionoption[0]?.optionvalue || null,
          onHandleChange: (newValue) => {
            onChangeValue(newValue, questionData);
          },
        };
        return textAreaProps;
      case "Checkbox":
        const checkBoxGroupProps: IMUICheckboxGroupProps = {
          lvData: questionConfig.questionoption.map((_questnConfig) => {
            return {
              label: _questnConfig.optionvalue,
              value: _questnConfig.optionid,
            };
          }),
          value: questionConfig.questionoption
            .filter((val) => !!val.selected)
            .map((_qoConfig) => _qoConfig.optionid),
          onHandleChange: (newValue) => {
            onChangeValue(newValue, questionData);
          },
        };
        return checkBoxGroupProps;
      default:
        return {};
    }
  };

  return (
    <Grid item lg={12} height={"-webkit-fill-available"} p={10}>
      <Grid
        height={"inherit"}
        width={"auto"}
        boxShadow={"0px 0px 10px 4px rgba(0,0,0,0.18)"}
        bgcolor={"#FFF"}
      >
        <Grid item fontSize={"1.2rem"} fontWeight={"bold"} p={2}>
          {questionData.question}
        </Grid>
        <Grid item pl={2}>
          {ComponentSelector(
            questionData.questiontype,
            getComponentPropsByType(questionData)
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Question;
