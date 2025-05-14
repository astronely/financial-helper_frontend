import {InfoColumn} from "@/components/ui/infoColumn/InfoColumn.jsx";
import './History.scss'
import {Transaction} from "./Transaction.jsx";
import {useEffect, useState} from "react";
import {TransactionService} from "@/features/transactions/service/transactionService.js";
import {useParams} from "react-router";
import {TransactionList} from "@/features/transactions/components/TransactionList.jsx";
// import {useModal} from "../../../hooks/useModal.js";
// import axios from "axios";
// import {AddExpenseModal} from "./TransactionModal.jsx";
// import {useApp} from "../../../hooks/useApp.js";
// import {toast} from "react-toastify";
// import "../../../utils/modalUtils.js"
// import {openConfirm, openModal} from "../../../utils/modalUtils.js";
// import {ConfirmItemDeleteModal} from "../../confirmation/Confirm.jsx";

export function TransactionsLayout() {
    // const {wallets, updateWallets} = useApp()
    // const [expenses, setExpenses] = useState([]);
    // const {setIsActive, setModal, modal} = useModal();
    // const [expenseToDelete, setExpenseToDelete] = useState('');
    //
    // const getExpense = expense => {
    //     // console.log("getExpense: ", expense)
    //     setExpenses(expenses => [...expenses, {
    //         id: expense.ID,
    //         wallet: expense.Wallet,
    //         wallet_name: expense.WalletName,
    //         currency: expense.Currency,
    //         shop_name: expense.Name,
    //         category: expense.Category,
    //         price: expense.Value,
    //         date: new Date(expense.Date).toISOString().split("T")[0],
    //     }])
    // }
    //
    // const getExpenses = async () => {
    //     await axios.get("http://localhost:8080/api/expenses/get_expenses", {withCredentials: true})
    //         .then(response => {
    //             setExpenses([])
    //             // console.log("getExpenses: ", expenses)
    //             if (response.data.sort(function(a,b) {
    //                 if (a.Date < b.Date) return 1;
    //                 if (a.Date > b.Date) return -1;
    //                 if (a.CreatedAt < b.CreatedAt) return 1;
    //                 if (a.CreatedAt >= b.CreatedAt) return -1;
    //                 }))
    //             {
    //                 for (let expense of response.data) {
    //                     getExpense(expense)
    //                 }
    //             }
    //         })
    //         .catch(error => console.log(error))
    // }
    //
    // const increaseWalletBalance = async data => {
    //     await axios.put("http://localhost:8080/api/wallets/increase_balance", data,{withCredentials: true})
    //         .then(() => {
    //             updateWallets()
    //         })
    //         .catch(error => {
    //             toast.error("Cannot update wallet balance")
    //             console.log(error.response)
    //         })
    // }
    //
    // async function deleteExpense(expense){
    //     console.log(expense)
    //     setExpenses(w => w.filter(item => item.id !== expense.id))
    //     await axios.delete("http://localhost:8080/api/expenses/delete",{
    //         data: {
    //             id: expense.id,
    //         },
    //         withCredentials: true},)
    //         .then(() => {
    //             increaseWalletBalance({
    //                 name: expense.wallet_name,
    //                 value: expense.price.toString(),
    //                 currency: expense.currency
    //             })
    //             toast.success("Successfully delete expense")
    //         })
    //         .catch(error => {
    //             console.log(error.response)
    //             toast.error("Expense not delete")
    //         })
    // }
    //
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         // console.log("Expenses useEffect")
    //         getExpenses().then()
    //     }, 10)
    //
    //     return () => clearTimeout(timeout)
    // }, [wallets])
    // <Transaction expense={item} confirmDelete={openConfirm} setExpenseToDelete={setExpenseToDelete}
    //              key={index}/>
    const [transactions, setTransactions] = useState([]);
    const transactionService = new TransactionService();
    const params = useParams()

    useEffect(() => {
        transactionService.list(params.id)
            .then(res => {
                // console.log("Transactions: ", res)
                setTransactions(res.transactions)
            })
            .catch(err => console.error("Error get list transactions: ", err))
    }, [])

    return (
        <InfoColumn>
            <div className={'column__title'}>Совершенные операции</div>
            <div className={'history'}>
                <TransactionList transactions={transactions}/>
            </div>
            <button className={"primary-button"}> Добавить </button>

            {/*<button onClick={() => openModal(setIsActive, setModal, 'addExpense')} className={"primary-button"}>Добавить</button>*/}
            {/*<AddExpenseModal open={modal === 'addExpense'} addExpense={getExpense}/>*/}
            {/*<ConfirmItemDeleteModal open={modal === 'confirmDeleteExpense'} item={expenseToDelete} deleteAction={deleteExpense}/>*/}
        </InfoColumn>
    )
}