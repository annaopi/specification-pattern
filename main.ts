import "dotenv/config";

import { Account } from "./domain/account/Account";
import { AccountMode } from "./domain/account/AccountMode";
import { StandardQuestionSpecification } from "./domain/answer/specification/StandardQuestionSpecification";
import { SoftwareDeveloperQuestionSpecification } from "./domain/answer/specification/SoftwareDeveloperQuestionSpecification";
import { QuestionClassifierImplementation } from "./infrastructure/ai/QuestionClassifierImplementation";
import { AnswerQuestionUseCase } from "./application/useCases/AnswerQuestionUseCase";

async function main() {

    const classifier = new QuestionClassifierImplementation();

    const standardSpecification = new StandardQuestionSpecification(classifier);

    const softwareDeveloperSpecification = new SoftwareDeveloperQuestionSpecification(classifier);

    const answerQuestionUseCase = new AnswerQuestionUseCase(
        classifier,
        standardSpecification, 
        softwareDeveloperSpecification
    );

    const premiumAccount = new Account(AccountMode.PREMIUM, 0);

    const freemiumAccount = new Account(AccountMode.FREEMIUM, 3);

    const standard_question = "How to organize day at New York?";

    const software_developer_question = "How do I create a class in TypeScript and add a constructor to it?";

    const premiumResult = await answerQuestionUseCase.execute(
        premiumAccount,
        standard_question
    );

    const premiumResultSoftwareDeveloperQuestion = await answerQuestionUseCase.execute(
        premiumAccount,
        software_developer_question
    );

    console.log("Premium account:");
    console.log("Question type:", premiumResult.type);
    console.log("Answer:", premiumResult.answer);

    console.log("Premium account - software developer question:");
    console.log("Question type: ", premiumResultSoftwareDeveloperQuestion.type);
    console.log("Answer: ", premiumResultSoftwareDeveloperQuestion.answer);

    console.log();

    const freemiumResult = await answerQuestionUseCase.execute(
        freemiumAccount,
        standard_question
    );

    const freemiumResultSoftwareDeveloperQuestion = await answerQuestionUseCase.execute(
        freemiumAccount,
        software_developer_question
    );

    console.log("Freemium account:");
    console.log("Question type:", freemiumResult.type);
    console.log("Answer:", freemiumResult.answer);

    console.log("Freemium account - software developer question:");
    console.log("Question type: ", freemiumResultSoftwareDeveloperQuestion.type);
    console.log("Answer: ", freemiumResultSoftwareDeveloperQuestion.answer);

}

main();