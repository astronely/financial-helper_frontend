import {WalletRepository} from "@/features/wallets/repository/walletRepository.js";
import {TransactionRepository} from "@/features/transactions/repository/transactionRepository.js";

export class TransactionService {
    constructor(repo = new TransactionRepository()) {
        this.repo = repo;
    }

    async list(boardID) {
        if (!boardID) throw new Error('BoardID is required')
        const response = await this.repo.list(boardID)
        return response
    }

    async getCategories() {
        const response = await this.repo.getCategories()
        return response
    }

    async create(data) {
        const response = await this.repo.create(data)
        return response
    }
}