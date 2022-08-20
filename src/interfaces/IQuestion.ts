export interface IQuestionOption {
  optionid: number;
  optionvalue:any;
  price: number;
  optionaction: string;
  selected: boolean;
  subquestion: null | any[];
}

export interface IQuestion {
  questionid: number;
  question: string;
  questiontype: "Radio" | "Date" | "Textarea" | "Checkbox";
  attributetype: 1 | 2 | 3 | 4;
  validation: boolean;
  questionoption: IQuestionOption[];
}

export interface IQuestions {
  questions: IQuestion[];
}
