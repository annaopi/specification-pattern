import { Agent } from "../../domain/agent/agent"
import { QuestionType } from "../../domain/answer/question-type"
import { LLMProvider } from "../../domain/agent/llm-provider"

export class QuestionClassifierAgent extends Agent {
	constructor() {
		super(
			"You are a question classifier. Classify the question as STANDARD_QUESTION or SOFTWARE_DEVELOPER_QUESTION",
			{
				type: "json_schema",
				name: "question_classifier",
				strict: true,
				json_schema: {
					name: "question_classifier",
					schema: {
						type: "object",

						properties: {
							type: {
								type: "string",
								enum: ["STANDARD_QUESTION", "SOFTWARE_DEVELOPER_QUESTION"],
							},
						},

						required: ["type"],
						additionalProperties: false,
					},
				},
			},
		)
	}

	parseAnswer(answer: string): QuestionType {
		const result = JSON.parse(answer)

		return result.type as QuestionType
	}

	async answer(question: string, llmProvider: LLMProvider): Promise<QuestionType> {
		const response = await super.answer(question, llmProvider)
		return this.parseAnswer(response)
	}
}
