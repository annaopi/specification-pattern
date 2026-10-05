import { AccountType } from "./account-type"

export class Account {
	private type: AccountType
	private freeUses: number

	constructor(type: AccountType, freeUses: number) {
		this.type = type
		this.freeUses = freeUses
	}

	public isPremium(): boolean {
		return this.type === AccountType.PREMIUM
	}

	public isFreemium(): boolean {
		return this.type === AccountType.FREEMIUM
	}

	public getFreeUses(): number {
		return this.freeUses
	}

	public useFreeUse(): void {
		if (this.freeUses > 0) {
			this.freeUses--
		}
	}
}
