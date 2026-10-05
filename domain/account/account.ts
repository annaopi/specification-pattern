import { AccountType } from "./account-type"

export type AccountRecord = {
	id: string
	username: string
	type: AccountType
	usageCount: number
}

export class Account {
	private readonly id: string
	private readonly username: string
	private type: AccountType
	private usageCount: number

	private constructor(id: string, username: string, type: AccountType, usageCount: number) {
		this.id = id
		this.username = username
		this.type = type
		this.usageCount = usageCount
	}

	public getId(): string {
		return this.id
	}

	public getUsername(): string {
		return this.username
	}

	public getType(): AccountType {
		return this.type
	}

	public isPremium(): boolean {
		return this.type === AccountType.PREMIUM
	}

	public isFreemium(): boolean {
		return this.type === AccountType.FREEMIUM
	}

	public getUsageCount(): number {
		return this.usageCount
	}

	public incrementUsageCount(): void {
		this.usageCount++
		if (this.usageCount > 3) {
			this.type = AccountType.PREMIUM
		}
	}

	static create(username: string): Account {
		const id = crypto.randomUUID()
		return new Account(id, username, AccountType.FREEMIUM, 0)
	}

	static rehydrate({ id, username, type, usageCount }: AccountRecord): Account {
		return new Account(id, username, type, usageCount)
	}
}
