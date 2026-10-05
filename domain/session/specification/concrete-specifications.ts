import { Session } from "../session"
import { QuestionType } from "../../answer/question-type"
import { SessionSpecification } from "./specification"

export class SoftwareDeveloperQuestionSpecification extends SessionSpecification {
	public isSatisfiedBy(session: Session): boolean {
		return session.getQuestionType() === QuestionType.SOFTWARE_DEVELOPER_QUESTION
	}
}

export class StandardQuestionSpecification extends SessionSpecification {
	public isSatisfiedBy(session: Session): boolean {
		return session.getQuestionType() === QuestionType.STANDARD_QUESTION
	}
}

export class PremiumAccountSpecification extends SessionSpecification {
	public isSatisfiedBy(session: Session): boolean {
		return session.getAccount().isPremium()
	}
}

export class FreemiumAccountSpecification extends SessionSpecification {
	public isSatisfiedBy(session: Session): boolean {
		return session.getAccount().isFreemium()
	}
}
