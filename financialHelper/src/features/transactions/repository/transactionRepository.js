import {get, list} from "@/api/transactionApi.js";

export class TransactionRepository {
    async get(walletID) {
        const response = await get(walletID)
        return response
    }

    async list(boardID) {
        const response  = await list(boardID);
        return response;
    }
}