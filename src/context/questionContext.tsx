import { createContext } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import { IQuestionContext } from "../interfaces/IQuestionContext";

export const QuestionContext = createContext<IQuestionContext | null>(null);
