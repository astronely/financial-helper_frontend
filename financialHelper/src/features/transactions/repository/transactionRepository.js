import {add, categories, get, list, update} from "@/api/transactionApi.js";
import {del} from "@/api/noteApi.js";

export class TransactionRepository {
    async get(walletID) {
        const response = await get(walletID)
        return response
    }

    async list(boardID) {
        const response  = await list(boardID);
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