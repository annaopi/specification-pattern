import { Account } from "../../domain/account/Account";
import { QuestionResult } from "../../domain/answer/QuestionResult";
import { QuestionClassifier } from "../../domain/answer/services/QuestionClassifier";
import { QuestionType } from "../../domain/answer/QuestionType";
import { Specification } from "../../domain/answer/specification/Specification";

export class AnswerQuestionUseCase {

    constructor(
        private questionClassifier: QuestionClassifier,
        private standardQuestionSpecification: Specification<string>,
        private softwareDeveloperQuestionSpecification: Specification<string>
    ) {}

    public async execute(
        account: Account,
        question: string
    ): Promise<QuestionResult> {

        const result = await this.questionClassifier.classify(question);

        if (account.isFreemium()) {
            return result;
        }

        if (result.type === QuestionType.STANDARD_QUESTION) {
            if (await this.standardQuestionSpecification.isSatisfiedBy(question)) {
                return result;
            }
        }

        if (result.type === QuestionType.SOFTWARE_DEVELOPER_QUESTION) {
            if (await this.softwareDeveloperQuestionSpecification.isSatisfiedBy(question)) {
                return result;
            }
        }

        return result;
    }
}