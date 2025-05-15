import styles from "./TransactionCard.module.scss";
import './TransactionCard.scss'
import {CircleX, Pen} from 'lucide-react'
import {useModal} from "@/shared/hooks/useModal.js";
import {useEffect, useState} from "react";
import {WalletService} from "@/features/wallets/service/walletSerivce.js";
import '@/features/shared/IconButtons.scss'

// import {useModal} from "../../../../hooks/useModal.js";

export function Transaction({transaction, confirmDelete, setExpenseToDelete}) {
    const {setIsActive, setModal} = useModal();

    // console.log("Transaction:", transaction.transaction)
    // console.log("Details: ", transaction.details)
    // console.log("Category: ", transaction.category)

    const walletService = new WalletService();
    const [walletName, setWalletName] = useState("");
    let transactionType = ""
    if (transaction.transaction.info.type === "income") {
        transactionType = "+"
    } else if (transaction.transaction.info.type === "expense") {
        transactionType = "-"
    }

    useEffect(() => {
        walletService.get(transaction.transaction.info.fromWalletId)
            .then(res => {
                // console.log("From useEffect get wallet", res)
                setWalletName(res.wallet.info.name)
            })
            .catch(err => console.error("Error get wallet info: ", err))
    }, [])

    // TODO: если transfer - то надо выводить откуда и куда
    return (
        <div className={styles.history__card}>
            <div className={"history-card__header"}>
                <div className="text-with-icon">
                    <div
                        className="history-card__primary-text history-card__operation-date">{transaction.details.info.transactionDate}</div>
                    <button
                        className="icon-button icon-button__pen"><Pen/></button>
                </div>
                <button className="icon-button icon-button__cross"><CircleX/></button>
            </div>
            <div className={"history-card__container"}>
                <div className={"history-card__info"}>
                    <div className={"history-card__primary-text"}>{transaction.category.name}</div>
                    <div
                        className={"history-card__primary-text history-card__shop-name"}>{transaction.details.info.name}</div>
                </div>
                <div className={"history-card__price"}>
                    <div
                        className={"history-card__primary-text"}>{transactionType} {transaction.transaction.info.amount} RUB
                    </div>
                    <div className={"history-card__primary-text history-card__wallet-name"}>{walletName}</div>
                </div>
            </div>
        </div>
    )
}