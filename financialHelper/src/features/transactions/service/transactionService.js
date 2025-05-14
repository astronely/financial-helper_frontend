import {WalletRepository} from "@/features/wallets/repository/walletRepository.js";
import {TransactionRepository} from "@/features/transactions/repository/transactionRepository.js";

export class TransactionService {
    constructor(repo = new TransactionRepository()) {
        this.repo = repo;
    }

    async list(boardID) {
        if (!boardID) throw new Error('BoardID is required')
        const data = await this.repo.list(boardID)
        console.log(data)
        return data
    }
}