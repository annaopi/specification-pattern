import { LLMProvider } from "./llm-provider"
import { RequestFactory } from "./request-factory"
import { ResponseSchema } from "./response-schema"

export class Agent {
	private developerMessage: string
	private responseFormat?: ResponseSchema

	constructor(developerMessage: string, responseFormat?: ResponseSchema) {
		this.developerMessage = developerMessage
		this.responseFormat = responseFormat
	}

	getDeveloperMessage(): string {
		return this.developerMessage
	}

	getResponseFormat(): ResponseSchema | undefined {
		return this.responseFormat
	}

	async answer(question: string, llmProvider: LLMProvider): Promise<string> {
		const requestFactory = new RequestFactory()
		const request = requestFactory.createRequest(this, question)
		const response = await llmProvider.generateAnswer(request)
		return response
	}
}
