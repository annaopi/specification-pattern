import "dotenv/config"

import { AnswerQuestionUseCase } from "./application/use-cases/answer-question"
import { OpenAIProvider } from "./infrastructure/providers/openai-provider"
import { FileSystemAccountRepository } from "./infrastructure/repositories/fs-account-repository"
import { CreateAccountUseCase } from "./application/use-cases/create-account"
import { GetAccountUseCase } from "./application/use-cases/get-account"
import { AccountRepository } from "./domain/account/account-repository"
import { LLMProvider } from "./domain/agent/llm-provider"

const accountRepository: AccountRepository = new FileSystemAccountRepository()
const llmProvider: LLMProvider = new OpenAIProvider()

// use cases
const answerQuestionUseCase = new AnswerQuestionUseCase(llmProvider, accountRepository)
export const ask = async (accountId: string, question: string) => {
	return answerQuestionUseCase.execute(accountId, question)
}

const createAccountUseCase = new CreateAccountUseCase(accountRepository)
export const createAccount = async (username: string) => {
	return createAccountUseCase.execute(username)
}

const getAccountUseCase = new GetAccountUseCase(accountRepository)
export const getAccount = async (username: string) => {
	return getAccountUseCase.execute(username)
}
