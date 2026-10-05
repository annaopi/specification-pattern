import { QuestionResult } from "../QuestionResult";

export interface QuestionClassifier {
    classify(question: string): Promise<QuestionResult>;
}