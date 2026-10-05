import fs from "fs/promises"
import path from "path"

import { Account, AccountRecord } from "../../domain/account/account"
import { AccountRepository as AccountRepositoryPort } from "../../domain/account/account-repository"
import { AccountType } from "../../domain/account/account-type"

const isAccountType = (value: unknown): value is AccountType =>
	value === AccountType.FREEMIUM || value === AccountType.PREMIUM

const parseRecord = (raw: string): AccountRecord => {
	const data: unknown = JSON.parse(raw)
	const { id, username, type, usageCount } = data as {
		id: string
		username: string
		type: AccountType
		usageCount: number
	}
	if (typeof data !== "object" || data === null) {
		throw new Error("Invalid account file: expected object")
	}
	if (!isAccountType(type) || typeof usageCount !== "number" || !Number.isInteger(usageCount) || usageCount < 0) {
		throw new Error("Invalid account file: malformed fields")
	}
	return { id, username, type, usageCount }
}

export class AccountRepository implements AccountRepositoryPort {
	private basePath: string

	constructor(basePath: string = path.join(process.cwd(), "data", "accounts")) {
		this.basePath = basePath
	}
	async findByUsername(username: string): Promise<Account | null> {
		let entries: string[]
		try {
			entries = await fs.readdir(this.basePath)
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === "ENOENT") {
				return null
			}
			throw error
		}

		for (const entry of entries) {
			if (!entry.endsWith(".json")) {
				continue
			}
			const id = entry.slice(0, -".json".length)
			try {
				const raw = await fs.readFile(this.filePath(id), "utf-8")
				const record = parseRecord(raw)
				if (record.username === username) {
					return Account.rehydrate({
						id,
						username: record.username,
						type: record.type,
						usageCount: record.usageCount,
					})
				}
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code === "ENOENT") {
					continue
				}
				throw error
			}
		}

		return null
	}

	private filePath(id: string): string {
		if (id.includes("/") || id.includes("\\") || id.includes("..")) {
			throw new Error("Invalid account id")
		}
		return path.join(this.basePath, `${id}.json`)
	}

	private async ensureDir(): Promise<void> {
		await fs.mkdir(this.basePath, { recursive: true })
	}

	async findById(id: string): Promise<Account | null> {
		try {
			const raw = await fs.readFile(this.filePath(id), "utf-8")
			const record = parseRecord(raw)
			return Account.rehydrate({
				id,
				username: record.username,
				type: record.type,
				usageCount: record.usageCount,
			})
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === "ENOENT") {
				return null
			}
			throw error
		}
	}

	async save(account: Account): Promise<void> {
		await this.ensureDir()
		const record: AccountRecord = {
			id: account.getId(),
			username: account.getUsername(),
			type: account.getType(),
			usageCount: account.getUsageCount(),
		}
		await fs.writeFile(this.filePath(account.getId()), JSON.stringify(record, null, 2), "utf-8")
	}
}
