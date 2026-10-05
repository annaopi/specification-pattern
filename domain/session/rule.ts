import { Agent } from "../agent/agent"
import { SessionSpecification } from "./specification/specification"

export type SessionRule = {
	specification: SessionSpecification
	agent: Agent
}
