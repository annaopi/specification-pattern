import { InferenceRequest } from "../../domain/agent/inference"
import { LLMProvider } from "../../domain/agent/llm-provider"

export class AnthropicProvider implements LLMProvider {
	generateAnswer(request: InferenceRequest): Promise<string> {
		throw new Error("Method not implemented.")
	}
}
