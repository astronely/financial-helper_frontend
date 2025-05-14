import {WalletRepository} from "@/features/wallets/repository/walletRepository.js";

export class WalletService {
    constructor(repo = new WalletRepository()) {
        this.repo = repo;
    }

    async get(walletID) {
        if (!walletID) throw new Error('WalletID is required')
        return await this.repo.getWallet(walletID)
    }

    async list(boardID) {
        if (!boardID) throw new Error('BoardID is required')
        return await this.repo.getWallets(boardID)
    }
}