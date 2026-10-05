import { QuestionType } from "./question-type"
import { Account } from "../account/account"

export class Session {
	private account: Account
	private question: string
	private questionType: QuestionType

	constructor(account: Account, question: string, questionType: QuestionType) {
		this.account = account
		this.question = question
		this.questionType = questionType
	}

	public getAccount(): Account {
		return this.account
	}

	public getQuestion(): string {
		return this.question
	}

	public getQuestionType(): QuestionType {
		return this.questionType
	}
}
