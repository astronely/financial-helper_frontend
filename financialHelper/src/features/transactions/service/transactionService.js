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

    async listFilter(boardId, queryParams) {
        if (!boardId) throw new Error('All fields are required')
        console.log(boardId + queryParams)
        return await this.repo.listFilter(boardId, queryParams)
    }

    async getCategories() {
        const response = await this.repo.getCategories()
        return response
    }

    async create(data) {
        const response = await this.repo.create(data)
        return response
    }

    async update(data) {
        const response = await this.repo.update(data)
        return response
    }

    async delete(id) {
        const response = await this.repo.delete(id)
        return response
    }
}