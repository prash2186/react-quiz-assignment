import React from "react";
import { Button, Grid } from "@mui/material";
import { useQuestionsForm } from "../../hooks/useQuestionsForm";

const QuesListFooter = () => {
  const { showNextIcon, showSubmitBtn , onClickNextBtn , onClickSubmitBtn} = useQuestionsForm();

  return (
    <Grid
      item
      lg={12}
      height={"15%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      bgcolor={"#F7F8FA"}
      boxShadow={"4px 0px 8px 0px rgba(0,0,0,0.16)"}
      pr={2}
    >
      {!!showNextIcon() ? (
        <Button variant="contained" size="small" onClick={onClickNextBtn}>
          Next
        </Button>
      ) : null}
      {!!showSubmitBtn() ? (
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={onClickSubmitBtn}
        >
          Submit
        </Button>
      ) : null}
    </Grid>
  );
};

export default QuesListFooter;
