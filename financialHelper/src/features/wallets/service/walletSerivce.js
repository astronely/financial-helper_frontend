import {WalletRepository} from "@/features/wallets/repository/walletRepository.js";

export class WalletService {
    constructor(repo = new WalletRepository()) {
        this.repo = repo;
    }

    async loadWallets(boardID) {
        if (!boardID) throw new Error('BoardID is required')
        return await this.repo.getWallets(boardID)
    }
}