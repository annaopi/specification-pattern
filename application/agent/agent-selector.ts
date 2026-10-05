import { Agent } from "../../domain/agent/agent"
import { SessionRule } from "../../domain/session/rule"
import { Session } from "../../domain/session/session"
import {
	FreemiumAccountSpecification,
	PremiumAccountSpecification,
	SoftwareDeveloperQuestionSpecification,
	StandardQuestionSpecification,
} from "../../domain/session/specification/concrete-specifications"
import { SoftwareDeveloperExpertAgent } from "./ddd-expert-agent"
import { StandardAgent } from "./standard-agent"

export class AgentSelector {
	rules: SessionRule[] = [
		{
			specification: new SoftwareDeveloperQuestionSpecification().and(new PremiumAccountSpecification()),
			agent: new SoftwareDeveloperExpertAgent(),
		},
		{
			specification: new SoftwareDeveloperQuestionSpecification().and(new FreemiumAccountSpecification()),
			agent: new StandardAgent(),
		},
		{
			specification: new StandardQuestionSpecification().and(new PremiumAccountSpecification()),
			agent: new StandardAgent(),
		},
		{
			specification: new StandardQuestionSpecification().and(new FreemiumAccountSpecification()),
			agent: new StandardAgent(),
		},
	]

	selectAgent(session: Session): Agent {
		const rule = this.rules.find((rule) => rule.specification.isSatisfiedBy(session))

		if (!rule) {
			throw new Error("No agent found for session")
		}

		return rule.agent
	}
}
