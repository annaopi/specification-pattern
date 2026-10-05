import OpenAI from "openai"
import { InferenceRequest } from "../../domain/agent/inference"
import { LLMProvider } from "../../domain/agent/llm-provider"

export class OpenAIProvider implements LLMProvider {
	private client: OpenAI

	constructor() {
		this.client = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY,
		})
	}

	async generateAnswer(request: InferenceRequest): Promise<string> {
		const response = await this.client.responses.create({
			model: "gpt-4.1-mini",
			input: [
				{
					role: "system",
					content: request.developer_message,
				},
				{
					role: "user",
					content: request.user_message,
				},
			],
			...(request.response_format && {
				text: {
					format: {
						type: "json_schema" as const,
						name: request.response_format.name,
						strict: request.response_format.strict,
						schema: request.response_format.schema,
					},
				},
			}),
		})

		return response.output_text
	}
}
