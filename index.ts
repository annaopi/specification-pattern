import "dotenv/config"

import { Account } from "./domain/account/account"
import { AnswerQuestionUseCase } from "./application/use-cases/answer-question"
import { OpenAIProvider } from "./infrastructure/providers/openai-provider"

const answerQuestionUseCase = new AnswerQuestionUseCase(new OpenAIProvider())

export const ask = async (account: Account, question: string) => {
	const result = await answerQuestionUseCase.execute(account, question)
	return result
}
