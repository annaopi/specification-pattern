import { ask, createAccount, getAccount } from "./index"

async function newAccount(username: string) {
	const account = await createAccount(username)
	console.log(account)
}

async function main() {
	const account = await getAccount("test-account")

	const result = await ask(account.getId(), "How to become senior software engineer?")
	console.log(result)
}

//newAccount("test-account")
main()
