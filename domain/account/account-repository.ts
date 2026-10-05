import { Account } from "./account"

export interface AccountRepository {
	save(account: Account): Promise<void>
	findById(id: string): Promise<Account | null>
	findByUsername(username: string): Promise<Account | null>
}
