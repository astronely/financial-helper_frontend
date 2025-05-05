import {useEffect, useState} from "react";
import {WalletService} from "@/features/wallets/service/walletSerivce.js";

export const useWallet = (boardID) => {
    const [wallets, setWallets] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const service = new WalletService();
        service.loadWallets(boardID)
            .then(setWallets)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [boardID]);

    return { wallets, loading, error }
}