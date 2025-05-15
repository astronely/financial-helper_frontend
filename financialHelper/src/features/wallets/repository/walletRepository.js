import {get, list, add, update, del} from "@/api/walletApi.js"
import {ToWallet, ToWalletList} from "@/api/models/wallet.js";

export class WalletRepository {
    async getWallet(walletID) {
        const data = await get(walletID)
        return data
    }

    async getWallets(boardID) {
        const response  = await list(boardID);
        // return ToWalletList(response.data)
        return response;
    }

    async create(data) {
        const response = await add(data);
        return response;
    }

    async update(data) {
        const response = await update(data);
        return response;
    }

    async delete(data) {
        const response = await del(data);
        return response;
    }
}