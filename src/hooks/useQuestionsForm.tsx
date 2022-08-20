import { useContext } from "react";
import { QuestionContext } from "../context/questionContext";
import { IQuestion } from "../interfaces/IQuestion";
import { IQuestionContext } from "../interfaces/IQuestionContext";
import data from "../questionsData.json";

export const useQuestionsForm = () => {
  const {
    questionsData,
    setQuestionData,
    questionIdSelected,
    setQuestionIdSelected,
    setAlert,
    setQuizStart,
  } = useContext<IQuestionContext>(QuestionContext as any);

  const getSelectedQuestnIdx = (): number => {
    return questionsData.findIndex(
      (_ques) => _ques.questionid === questionIdSelected
    );
  };

  const showPrevIcon = (): boolean => {
    return getSelectedQuestnIdx() === 0 ? false : true;
  };

  const showNextIcon = (): boolean => {
    const questnIdxSelected = getSelectedQuestnIdx();
    return questnIdxSelected >= 0 &&
      !(questnIdxSelected + 1 === questionsData.length)
      ? true
      : false;
  };

  const showSubmitBtn = (): boolean => {
    const questnIdxSelected = getSelectedQuestnIdx();

    if (questnIdxSelected === -1) return false;
    return questnIdxSelected + 1 === questionsData.length ? true : false;
  };

  const onClickNextBtn = () => {
    const questnIdxSelected = getSelectedQuestnIdx();
    setQuestionIdSelected(questionsData[questnIdxSelected + 1].questionid);
  };

  const onClickPrevBtn = () => {
    const questnIdxSelected = getSelectedQuestnIdx();
    setQuestionIdSelected(questionsData[questnIdxSelected - 1].questionid);
  };

  const validateFieldByType = (_qData: IQuestion) => {
    switch (_qData.questiontype) {
      case "Radio":
        return _qData.questionoption.find((_qoConfig) => !!_qoConfig.selected);
      default:
        break;
    }
  };

  const validateQuestionOnSubmit = () => {
    const errorInQuestionIdArr: any[] = [];
    questionsData.forEach((_qData) => {
      if (!!_qData.validation) {
        if (!validateFieldByType(_qData)) {
          errorInQuestionIdArr.push(_qData.questionid);
        }
      }
    });
    if (errorInQuestionIdArr.length > 0) {
      setAlert({
        isOpen: true,
        type: "warning",
        message: `Please select some value for this question`,
      });

      setQuestionIdSelected(errorInQuestionIdArr[0]);

      return false;
    }

    return true;
  };

  const onClickSubmitBtn = () => {
    if (!!validateQuestionOnSubmit()) {
      setAlert({ isOpen: true, type: "success", message: "Quiz Completed" });
      setQuestionIdSelected(null);
      setQuestionData(data.questions as IQuestion[]);
      setQuizStart(false);
    }
  };

  const getQuestionData: IQuestion = questionsData.find(
    (_quesConfig) => _quesConfig.questionid === questionIdSelected
  ) as IQuestion;

  const onChangeValue = (newValue: any, questionConfig: IQuestion) => {
    console.log("newValue", newValue);
    const cloneQuestiondata = [...questionsData];
    const findQuestion = cloneQuestiondata.find(
      (_qConfig) => _qConfig.questionid === questionConfig.questionid
    ) as IQuestion;
    switch (questionConfig.questiontype) {
      case "Radio":
        const newSelectedId = newValue;
        findQuestion.questionoption.forEach((_qoConfig, idx) => {
          if (_qoConfig.optionid !== +newSelectedId) {
            findQuestion.questionoption[idx].selected = false;
          } else {
            findQuestion.questionoption[idx].selected = true;
          }
        });
        break;

      case "Date":
        findQuestion.questionoption[0].optionvalue = newValue;
        break;

      case "Textarea":
        findQuestion.questionoption[0].optionvalue = newValue;
        break;

      case "Checkbox":
        findQuestion.questionoption.forEach((val, idx) => {
          if (!!newValue.includes(val.optionid)) {
            findQuestion.questionoption[idx].selected = true;
          } else {
            findQuestion.questionoption[idx].selected = false;
          }
        });
      default:
        break;
    }
    setQuestionData([...cloneQuestiondata]);
  };

  return {
    showPrevIcon,
    showNextIcon,
    showSubmitBtn,
    onClickNextBtn,
    onClickPrevBtn,
    onClickSubmitBtn,
    getQuestionData,
    onChangeValue,
  };
};
