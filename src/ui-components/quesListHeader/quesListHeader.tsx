import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { QuestionContext } from "../../context/questionContext";
import { useQuestionsForm } from "../../hooks/useQuestionsForm";
import { IQuestionContext } from "../../interfaces/IQuestionContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const QuesListHeader = () => {
  const {
    questionsData,
    setQuestionData,
    questionIdSelected,
    setQuestionIdSelected,
  } = useContext<IQuestionContext>(QuestionContext as any);

  const { showPrevIcon , onClickPrevBtn } = useQuestionsForm();

  return (
    <Grid
      item
      lg={12}
      height={"10%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      bgcolor={"#F7F8FA"}
      boxShadow={"0px 4px 8px 0px rgba(0,0,0,0.16)"}
      pl={2}
    >
      <Grid item>{!!showPrevIcon() ? <ArrowBackIcon onClick={onClickPrevBtn} /> : null}</Grid>
    </Grid>
  );
};

export default QuesListHeader;
