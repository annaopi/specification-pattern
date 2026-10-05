import { Account } from "../../domain/account/account"
import { AccountRepository } from "../../domain/account/account-repository"

export class GetAccountUseCase {
	private accountRepository: AccountRepository

	constructor(accountRepository: AccountRepository) {
		this.accountRepository = accountRepository
	}

	async execute(username: string): Promise<Account> {
		const account = await this.accountRepository.findByUsername(username)
		if (!account) {
			throw new Error("Account not found")
		}
		return account
	}
}
