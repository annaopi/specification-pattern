import { LLMProvider } from "../../domain/agent/llm-provider"
import { QuestionClassifierAgent } from "../agent/question-classifier-agent"
import { Session } from "../../domain/session/session"
import { AgentSelector } from "../agent/agent-selector"
import { AccountRepository } from "../../domain/account/account-repository"

export class AnswerQuestionUseCase {
	private llmProvider: LLMProvider
	private accountRepository: AccountRepository

	constructor(llmProvider: LLMProvider, accountRepository: AccountRepository) {
		this.llmProvider = llmProvider
		this.accountRepository = accountRepository
	}

	public async execute(accountId: string, question: string): Promise<string> {
		const account = await this.accountRepository.findById(accountId)
		if (!account) {
			throw new Error("Account not found")
		}

		const classifier = new QuestionClassifierAgent()
		const questionType = await classifier.answer(question, this.llmProvider)
		const session = new Session(account, question, questionType)

		const agent = new AgentSelector().selectAgent(session)
		const response = await agent.answer(question, this.llmProvider)
		account.incrementUsageCount()

		await this.accountRepository.save(account)
		return response
	}
}
