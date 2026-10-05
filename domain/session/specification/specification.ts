import { Session } from "../session"

export abstract class SessionSpecification {
	abstract isSatisfiedBy(session: Session): boolean

	and(specification: SessionSpecification): SessionSpecification {
		return new AndSessionSpecification(this, specification)
	}

	or(specification: SessionSpecification): SessionSpecification {
		return new OrSessionSpecification(this, specification)
	}

	not(): SessionSpecification {
		return new NotSessionSpecification(this)
	}
}

class AndSessionSpecification extends SessionSpecification {
	constructor(
		private left: SessionSpecification,
		private right: SessionSpecification,
	) {
		super()
	}

	isSatisfiedBy(session: Session): boolean {
		return this.left.isSatisfiedBy(session) && this.right.isSatisfiedBy(session)
	}
}

class OrSessionSpecification extends SessionSpecification {
	constructor(
		private left: SessionSpecification,
		private right: SessionSpecification,
	) {
		super()
	}

	isSatisfiedBy(session: Session): boolean {
		return this.left.isSatisfiedBy(session) || this.right.isSatisfiedBy(session)
	}
}

class NotSessionSpecification extends SessionSpecification {
	constructor(private specification: SessionSpecification) {
		super()
	}

	isSatisfiedBy(session: Session): boolean {
		return !this.specification.isSatisfiedBy(session)
	}
}
