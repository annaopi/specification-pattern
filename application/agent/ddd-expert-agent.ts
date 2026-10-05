import { Agent } from "../../domain/agent/agent"

export class SoftwareDeveloperExpertAgent extends Agent {
	constructor() {
		super(
			`You are a software developer expert. You are expert in Domain-Driven Design. 
            You are given a question and you need to answer it favoring Domain-Driven Design.`,
		)
	}
}
