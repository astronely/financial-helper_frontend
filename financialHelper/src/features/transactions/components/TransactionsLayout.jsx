import {InfoColumn} from "@/components/ui/infoColumn/InfoColumn.jsx";
import './Transaction.scss'
import {useEffect, useState} from "react";
import {TransactionService} from "@/features/transactions/service/transactionService.js";
import {useParams} from "react-router";
import {TransactionList} from "@/features/transactions/components/TransactionList.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {WalletService} from "@/features/wallets/service/walletSerivce.js";
import {toast} from "react-toastify";

export function TransactionsLayout() {
    const [transactions, setTransactions] = useState([]);
    const [queryParams, setQueryParams] = useState('');
    const [usedParams, setUsedParams] = useState([]);
    const params = useParams()
    const {updateItems, setUpdateItems, setIsActive, setModal, baseInfo, setBaseInfo, setSubmitHandler} = useModal()


    const transactionService = new TransactionService();
    const walletService = new WalletService()

    const handleAddTransaction = async data => {
        try {
            // console.log(data)
            const dataToSend = {
                info: {
                  fromWalletId: data.from_wallet.value.toString(),
                  toWalletId: data.to_wallet?.value.toString(),
                  amount: data.price.trim(),
                  type: data.type.value.toString()
                },
                detailsInfo: {
                    name: data.shop_name.trim(),
                    category: data.category.value.toString(),
                    transactionDate: data.date
                }
            }
            // console.log(dataToSend)
            const response = await transactionService.create(dataToSend)
            // console.log(response)
            setUpdateItems(!updateItems)
            setIsActive(false)

        } catch (err) {
            toast.error("Не удалось добавить операцию, проверьте поля")
            console.error("Не удалось добавить операцию: " + err)
        }
    }

    const handleUpdateTransaction = async data => {
        try {
            // console.log("Handle Update Transaction")
            // console.log(data)
            const dataToSend = {
                id: data.id,
                info: {
                    name: data.name.trim(),
                    amount: data.amount.trim(),
                    fromWalletId: data.fromWalletId.value.toString(),
                    toWalletId: data.type.value.toString() === 'transfer' ? data.toWalletId.value.toString() : null,
                    type: data.type.value.toString(),
                    category: data.category.value.toString(),
                }
            }
            const response = await transactionService.update(dataToSend)
            // console.log(response)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (err) {
            console.error("Не удалось обновить операцию: " + err)
        }
    }

    const handleDeleteTransaction = async ({id, name}) => {
        try {
            // console.log("Handle delete transaction: " + id + ":" + name)
            const response = await transactionService.delete(id)
            setUpdateItems(!updateItems)
            setIsActive(false)
        } catch (error) {
            console.error("Не удалось удалить операцию: " + error)
        }
    }

    const handleFilterTransactions = async data => {
        try {
            // console.log(data)
            let filtersQuery = "?"
            setUsedParams([]);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const value = data[key];
                    if (value != null) {
                        filtersQuery += "filterInfo." + key + "=" + value.value.toString() + "&"
                        console.log(key)
                        setUsedParams(prev => ([...prev, key]))
                    }
                }
            }

            if (filtersQuery.endsWith("&")) {
                filtersQuery = filtersQuery.slice(0, -1);
            }
            // console.log(filtersQuery)
            setQueryParams(filtersQuery)
        } catch (err) {
            console.error("Ошибка применения фильтрации: " + err)
        }
    }

    function openModal(modalName, transactionID, transactionName, transactionData) {
        setIsActive(true)
        setModal(modalName)
        switch (modalName) {
            case "addTransaction":
                walletService.list(params.id)
                    .then(res => {
                        // console.log(res.wallets)
                        setBaseInfo(prev => ({...prev, wallets: res.wallets}))
                        setSubmitHandler(() => handleAddTransaction)
                    })
                    .catch(err => console.error("Ошибка получения списка доступных кошельков: " + err))

                transactionService.getCategories()
                    .then(res => {
                        // console.log(res.categories)
                        setBaseInfo(prev => ({...prev, categories: res.categories}))
                    })
                    .catch(err => console.error("Ошибка получения списка доступных категорий: " + err))
                break;

            case "updateTransaction":
                walletService.list(params.id)
                    .then(res => {
                        setBaseInfo(prev => ({...prev, wallets: res.wallets}))
                    })
                    .catch(err => console.error("Ошибка получения списка доступных кошельков: " + err))

                transactionService.getCategories()
                    .then(res => {
                        // console.log(res.categories)
                        setBaseInfo(prev => ({...prev, categories: res.categories}))
                    })
                    .catch(err => console.error("Ошибка получения списка доступных категорий: " + err))
                setBaseInfo(prev => ({...prev, data: transactionData}))
                setSubmitHandler(() => handleUpdateTransaction)
                break;

            case "confirm":
                setBaseInfo({name: transactionName})
                setSubmitHandler(() => (data) =>
                    handleDeleteTransaction({...data, id: transactionID, name: transactionName})
                )
                break;

            case "filterTransaction":
                walletService.list(params.id)
                    .then(res => {
                        setBaseInfo(prev => ({...prev, wallets: res.wallets}))
                        setSubmitHandler(() => handleFilterTransactions)
                    })
                    .catch(err => console.error("Ошибка получения списка доступных кошельков: " + err))

                transactionService.getCategories()
                    .then(res => {
                        setBaseInfo(prev => ({...prev, categories: res.categories}))
                    })
                    .catch(err => console.error("Ошибка получения списка доступных категорий: " + err))
                break;
        }
    }

    useEffect(() => {
        transactionService.listFilter(params.id, queryParams)
            .then(res => {
                // console.log("Transactions: ", res)
                setTransactions([])
                setTransactions(res.transactions)
            })
            .catch(err => console.error("Error get list transactions: ", err))
    }, [updateItems, queryParams])


    return (
        <InfoColumn>
            <div className='column__title'>Совершенные операции</div>
            <div className='history'>
                <TransactionList transactions={transactions} usedParams={usedParams} openModal={openModal}/>
            </div>
            <button onClick={() => openModal('addTransaction')} className={"primary-button"}> Добавить</button>
        </InfoColumn>
    )
}