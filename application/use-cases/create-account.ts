import { Account } from "../../domain/account/account"
import { AccountRepository } from "../../domain/account/account-repository"
import { AccountType } from "../../domain/account/account-type"

export class CreateAccountUseCase {
	private accountRepository: AccountRepository

	constructor(accountRepository: AccountRepository) {
		this.accountRepository = accountRepository
	}

	async execute(username: string): Promise<Account> {
		const existingAccount = await this.accountRepository.findByUsername(username)
		if (existingAccount) {
			throw new Error("Account with this username already exists")
		}
		const account = Account.create(username)
		await this.accountRepository.save(account)
		return account
	}
}
