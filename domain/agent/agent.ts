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
}
