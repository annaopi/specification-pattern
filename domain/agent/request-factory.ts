import { Agent } from "./agent"
import { InferenceRequest } from "./inference"

export class RequestFactory {
	createRequest(agent: Agent, userMessage: string): InferenceRequest {
		const responseFormat = agent.getResponseFormat()

		return {
			developer_message: agent.getDeveloperMessage(),
			user_message: userMessage,
			response_format: responseFormat
				? {
						type: "json_schema",
						name: responseFormat.name,
						strict: responseFormat.strict,
						schema: responseFormat.json_schema.schema,
					}
				: undefined,
		}
	}
}
