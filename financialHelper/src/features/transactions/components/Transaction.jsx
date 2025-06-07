import styles from "./TransactionCard.module.scss";
import './TransactionCard.scss'
import {CircleX, Pen} from 'lucide-react'
import {useModal} from "@/shared/hooks/useModal.js";
import {useEffect, useState} from "react";
import {WalletService} from "@/features/wallets/service/walletSerivce.js";
import '@/features/shared/IconButtons.scss'

// import {useModal} from "../../../../hooks/useModal.js";

export function Transaction({transaction,  openModal}) {
    const {updateItems} = useModal();

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day}-${month}-${year}`;
    };

    const walletService = new WalletService();
    const [walletName, setWalletName] = useState("");
    const [toWalletName, setToWalletName] = useState("");
    const [formatedDate, setFormatedDate] = useState("");

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
            .catch(err => console.error("Error get from_wallet info: ", err))
        if (transaction.transaction.info.toWalletId) {
            walletService.get(transaction.transaction.info.toWalletId)
                .then(res => {
                    setToWalletName(res.wallet.info.name)
                })
                .catch(err => console.error("Error get to_wallet info: ", err))
        }
        setFormatedDate(formatDate(transaction.details.info.transactionDate))
    }, [updateItems])

    return (
        <div className={styles.history__card}>
            <div className="history-card__header">
                <div className="text-with-icon">
                    <div
                        className="history-card__primary-text history-card__operation-date">{formatedDate}</div>
                    <button onClick={() => openModal('updateTransaction', transaction.id, transaction.details.info.name,
                        {
                            id: transaction.transaction.id,
                            name: transaction.details.info.name,
                            fromWalletId: transaction.transaction.info.fromWalletId,
                            toWalletId: transaction.transaction.info.toWalletId,
                            amount: transaction.transaction.info.amount,
                            type: transaction.transaction.info.type,
                            category: transaction.details.info.category,
                            transactionDate: transaction.details.info.transactionDate,
                        })}
                        className="icon-button icon-button__pen"><Pen/></button>
                </div>
                <button onClick={() => openModal('confirm', transaction.transaction.id, transaction.details.info.name)}
                        className="icon-button icon-button__cross"><CircleX/></button>
            </div>
            <div className="history-card__container">
                <div className="history-card__info">
                    <div className="history-card__primary-text">{transaction.category.name}</div>
                    <div
                        className="history-card__primary-text history-card__shop-name">{transaction.details.info.name}</div>
                </div>
                <div className="history-card__price">
                    <div
                        className="history-card__primary-text">{transactionType} {transaction.transaction.info.amount} RUB
                    </div>
                    <div className="history-card__primary-text history-card__wallet-name">{walletName} {transaction.transaction.info.type === 'transfer' ? "-> " + toWalletName : ""}</div>
                </div>
            </div>
        </div>
    )
}