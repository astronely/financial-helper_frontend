import styles from "./HistoryCard.module.scss";
import './HistoryCard.scss'
import {CircleX} from 'lucide-react'
import {useModal} from "@/shared/hooks/useModal.js";
import {useEffect, useState} from "react";
import {WalletService} from "@/features/wallets/service/walletSerivce.js";

// import {useModal} from "../../../../hooks/useModal.js";

export function Transaction({transaction, confirmDelete, setExpenseToDelete}) {
    const {setIsActive, setModal} = useModal();
    console.log("Transaction:", transaction.transaction)
    console.log("Details: ", transaction.details)
    console.log("Category: ", transaction.category)
    const walletService = new WalletService();
    const [walletName, setWalletName] = useState("");
    useEffect(() => {
        walletService.get(transaction.transaction.info.fromWalletId)
            .then(res => {
                console.log("From useEffect get wallet", res)
                setWalletName(res.wallet.info.name)
            })
            .catch(err => console.error("Error get wallet info: ", err))
    }, [])

    return (
        <div className={styles.history__card}>
            <div className={"history-card__header"}>
                <div
                    className={"history-card__primary-text history-card__operation-date"}>{transaction.details.info.transactionDate}</div>
                {/*<button onClick={() => closeAction(expense)} className={"wallet__button"}><CircleX/></button>*/}
                <button
                    // onClick={() => confirmDelete(setIsActive, setModal, 'confirmDeleteExpense', expense, setExpenseToDelete)}
                    className={"wallet__button wallet__cross"}><CircleX/></button>
            </div>
            <div className={"history-card__container"}>
                <div className={"history-card__info"}>
                    <div className={"history-card__primary-text"}>{transaction.category.name}</div>
                    <div
                        className={"history-card__primary-text history-card__shop-name"}>{transaction.details.info.name}</div>
                </div>
                <div className={"history-card__price"}>
                    <div className={"history-card__primary-text"}>{transaction.price} RUB</div>
                    <div
                        className={"history-card__primary-text history-card__wallet-name"}>{walletName}</div>
                </div>
            </div>
        </div>
    )
}