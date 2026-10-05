import { Agent } from "../../domain/agent/agent"

export class StandardAgent extends Agent {
	constructor() {
		super("You are a general agent. You are given a question and you need to answer it.")
	}
}
