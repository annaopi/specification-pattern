import { AccountMode } from "./AccountMode";

export class Account {
    private mode: AccountMode;
    private freeUses: number;

    constructor(mode: AccountMode, freeUses: number) {
        this.mode = mode;
        this.freeUses = freeUses;
    }

    public isPremium(): boolean {
        return this.mode === AccountMode.PREMIUM;
    }

    public isFreemium(): boolean {
        return this.mode === AccountMode.FREEMIUM;
    }

    public getFreeUses(): number {
        return this.freeUses;
    }

    public useFreeUse(): void {
        if (this.freeUses > 0) {
            this.freeUses--;
        }
    }
}