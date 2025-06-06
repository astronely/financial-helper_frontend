import {add, categories, get, list, listFilter, update, del} from "@/api/transactionApi.js";

export class TransactionRepository {
    async get(walletID) {
        const response = await get(walletID)
        return response
    }

    async list(boardID) {
        const response  = await list(boardID);
        return response;
    }

    async listFilter(boardId, queryParams) {
        const response = await listFilter(boardId, queryParams);
        return response;
    }

    async getCategories() {
        const response = await categories()
        return response
    }

    async create(data) {
        const response = await add(data);
        return response;
    }

    async delete(id) {
        const response = await del(id);
        return response;
    }

    async update(data) {
        const response = await update(data);
        return response;
    }
}