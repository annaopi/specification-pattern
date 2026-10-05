import { InferenceRequest } from "./inference"

export interface LLMProvider {
	generateAnswer(request: InferenceRequest): Promise<string>
}
