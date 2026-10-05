import { Account } from "./domain/account/account"
import { AccountType } from "./domain/account/account-type"
import { ask } from "./index"

async function main() {
	const premiumAccount = new Account(AccountType.PREMIUM, 0)

	const result = await ask(premiumAccount, "How to organize day at New York?")
	console.log(result)
}

main()
