import { IQuestion } from "./IQuestion";

export interface IAlertSnackbar {
  type: "success" | "warning";
  message: string;
  isOpen: boolean;
}
export interface IQuestionContext {
  questionsData: IQuestion[];
  setQuestionData: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  questionIdSelected: number | null;
  setQuestionIdSelected: React.Dispatch<React.SetStateAction<number | null>>;
  setAlert: React.Dispatch<React.SetStateAction<IAlertSnackbar>>;
  setQuizStart: React.Dispatch<React.SetStateAction<boolean>>;
}
