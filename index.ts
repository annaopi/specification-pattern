import "dotenv/config"

import { AnswerQuestionUseCase } from "./application/use-cases/answer-question"
import { OpenAIProvider } from "./infrastructure/providers/openai-provider"
import { AccountRepository } from "./infrastructure/repositories/account-repository"
import { CreateAccountUseCase } from "./application/use-cases/create-account"
import { GetAccountUseCase } from "./application/use-cases/get-account"

const answerQuestionUseCase = new AnswerQuestionUseCase(new OpenAIProvider(), new AccountRepository())

export const ask = async (accountId: string, question: string) => {
	return answerQuestionUseCase.execute(accountId, question)
}

const createAccountUseCase = new CreateAccountUseCase(new AccountRepository())

export const createAccount = async (username: string) => {
	return createAccountUseCase.execute(username)
}

const getAccountUseCase = new GetAccountUseCase(new AccountRepository())

export const getAccount = async (username: string) => {
	return getAccountUseCase.execute(username)
}
