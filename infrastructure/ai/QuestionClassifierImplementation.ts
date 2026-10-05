import OpenAI from "openai";

import { QuestionClassifier } from "../../domain/answer/services/QuestionClassifier";
import { QuestionResult } from "../../domain/answer/QuestionResult";
import { QuestionType } from "../../domain/answer/QuestionType";

export class QuestionClassifierImplementation implements QuestionClassifier {

    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    public async classify(question: string): Promise<QuestionResult> {

        const response = await this.client.responses.create({
            model: "gpt-4.1-mini",

            input: [
                {
                    role: "system",
                    content:
                        "Classify the question as STANDARD_QUESTION or SOFTWARE_DEVELOPER_QUESTION and provide a short answer to the question. Return both the classification and the answer. For premium users, provide a more detailed answer."
                },
                {
                    role: "user",
                    content: question
                }
            ],

            text: {
                format: {
                    type: "json_schema",
                    name: "question_result",
                    strict: true,

                    schema: {
                        type: "object",

                        properties: {
                            type: {
                                type: "string",
                                enum: [
                                    "STANDARD_QUESTION",
                                    "SOFTWARE_DEVELOPER_QUESTION"
                                ]
                            },

                            answer: {
                                type: "string"
                            }
                        },

                        required: ["type", "answer"],
                        additionalProperties: false
                    }
                }
            }
        });

        const result = JSON.parse(response.output_text);
        
        return {
            type: result.type as QuestionType,
            answer: result.answer
        };
    }
}