import { Alert, Button, Grid, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import { IQuestion } from "../../interfaces/IQuestion";
import data from "../../questionsData.json";
import FlagIcon from "@mui/icons-material/Flag";
import QuesListHeader from "../quesListHeader/quesListHeader";
import QuesListFooter from "../quesListFooter/quesListFooter";
import { QuestionContext } from "../../context/questionContext";
import Question from "../question/question";
import { IAlertSnackbar } from "../../interfaces/IQuestionContext";

const QuizWrapper = () => {
  const [questionsData, setQuestionData] = useState<IQuestion[]>(
    data.questions as IQuestion[]
  );
  const [quizStart, setQuizStart] = useState<boolean>(false);
  const [questionIdSelected, setQuestionIdSelected] = useState<number | null>(
    null
  );

  const [alert, setAlert] = useState<IAlertSnackbar>({
    type: "success",
    message: "",
    isOpen: false,
  });

  useEffect(() => {
    // whenever the quiz is start set question id from the questionsData Array (0th index)
    if (!!quizStart && !!questionsData[0]?.questionid) {
      setQuestionIdSelected(questionsData[0].questionid);
    }
    // if there is no question in question data set quizStart to false and give a notification "No Question Found"
    else {
      setQuizStart(false);
    }
  }, [quizStart]);

  const handleOnClickStartBtn = () => {
    setQuizStart(!quizStart);
  };
  //   when quiz is not started Start Quiz Button will render at the center of UI
  const getStartQuizBtn = () => {
    if (!quizStart) {
      return (
        <Grid item>
          <Button
            variant="contained"
            size="large"
            endIcon={<FlagIcon />}
            onClick={handleOnClickStartBtn}
          >
            Start Quiz
          </Button>
        </Grid>
      );
    }
    return null;
  };

  // render Question by type
  const getQuestions = () => {
    return questionsData.map((_questnConfig, index) => {
      return (
        <Slide
          key={`${_questnConfig.questionid}_${index}`}
          direction="left"
          in={quizStart && questionIdSelected === _questnConfig.questionid}
          mountOnEnter
          unmountOnExit
        >
          <Grid item lg={12} height={"75%"}>
            <Question />
          </Grid>
        </Slide>
      );
    });
  };

  // context memo
  const questionContext = {
    questionsData,
    setQuestionData,
    questionIdSelected,
    setQuestionIdSelected,
    setAlert,
    setQuizStart,
  };

  const questionContextMemo = useMemo(() => questionContext, [questionContext]);

  // callback to close the alert box
  const onCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, isOpen: false });
  };
  return (
    <Grid
      container
      lg={12}
      height={"100vh"}
      width={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
      // scroll is coming for 0.5 sec on sliding forcefully hiding the scroll
      overflow={"hidden"}
    >
      <QuestionContext.Provider value={questionContextMemo as any}>
        {getStartQuizBtn()}
        {!!quizStart ? (
          <>
            <Grid
              lg={12}
              height={"90%"}
              width={"100%"}
              m={4}
              bgcolor={"#F3F3F3"}
              border={"2px solid #eeeeee"}
            >
              {/* header in which previous icon will render */}
              <QuesListHeader />
              {getQuestions()}
              {/* footer in which next btn and submit btn will show up */}
              <QuesListFooter />
            </Grid>
          </>
        ) : null}
        <Snackbar
          open={alert.isOpen}
          autoHideDuration={5000}
          onClose={onCloseAlert}
        >
          <Alert
            onClose={onCloseAlert}
            severity={alert.type}
            sx={{ width: "100%" }}
          >
            {alert.message}{" "}
          </Alert>
        </Snackbar>
      </QuestionContext.Provider>
    </Grid>
  );
};

export default QuizWrapper;
