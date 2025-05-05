import {get, list} from "@/api/walletApi.js"
import {ToWallet, ToWalletList} from "@/api/models/wallet.js";

export class WalletRepository {
    async getWallet(walletID) {
        const { data } = await get(walletID)
        return ToWallet(data)
    }

    async getWallets(boardID) {
        const { data } = await list(boardID)
        return ToWalletList(data)
    }
}