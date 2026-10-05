import { QuestionClassifier } from "../services/QuestionClassifier";
import { QuestionType } from "../QuestionType";
import { Specification } from "./Specification";

export class SoftwareDeveloperQuestionSpecification
    implements Specification<string> {

    constructor(private classifier: QuestionClassifier) {}

    public async isSatisfiedBy(question: string): Promise<boolean> {
        const result = await this.classifier.classify(question);

        return result.type === QuestionType.SOFTWARE_DEVELOPER_QUESTION;
    }
}