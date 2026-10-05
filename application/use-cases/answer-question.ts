import { Account } from "../../domain/account/account"
import { LLMProvider } from "../../domain/agent/llm-provider"
import { QuestionClassifierAgent } from "../agent/question-classifier-agent"
import { RequestFactory } from "../../domain/agent/request-factory"
import { Session } from "../../domain/session/session"
import { AgentSelector } from "../agent/agent-selector"

export class AnswerQuestionUseCase {
	private llmProvider: LLMProvider
	private requestFactory: RequestFactory

	constructor(llmProvider: LLMProvider) {
		this.llmProvider = llmProvider
		this.requestFactory = new RequestFactory()
	}

	public async execute(account: Account, question: string): Promise<string> {
		const classifier = new QuestionClassifierAgent()
		const classifierRequest = this.requestFactory.createRequest(classifier, question)
		const classifierResponse = await this.llmProvider.generateAnswer(classifierRequest)

		const questionType = classifier.parseAnswer(classifierResponse)

		const session = new Session(account, question, questionType)

		const agent = new AgentSelector().selectAgent(session)
		const request = this.requestFactory.createRequest(agent, question)
		const response = await this.llmProvider.generateAnswer(request)

		return response
	}
}
