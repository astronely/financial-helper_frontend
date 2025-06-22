import {Transaction} from "@/features/transactions/components/Transaction.jsx";
import {SlidersHorizontal} from "lucide-react";

export function TransactionList({transactions, usedParams, openModal}) {
    const queryDict = {
        "category": "Категория",
        "transactionDate": "Дата проведения от",
        "transactionDateEnd": "Дата проведения до",
        "type": "Тип операции",
        "fromWalletId": "Кошелек",
        "name": "Магазин",
    }

    return (
        <>
            <div className='history__header'>
                <div className='history__header-top'>
                    <div className='history__header-top-title'>Фильтры</div>
                    <button onClick={() => {
                        openModal('filterTransaction')
                    }}
                            className='icon-button icon-button__filter'><SlidersHorizontal/></button>
                </div>
                <div className={`history__header-div ${usedParams.length > 0 ? 'history__header-div-visible' : ''}`} />
                <div className={`history__filters ${usedParams.length > 0 ? 'history__filters-visible' : ''}`}>
                    <span className='history__filters-title'>Активные фильтры</span>
                    <div className="history__filters-list">
                        {usedParams.map((item) => (
                            <div className='history__filter'>{queryDict[item]}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='history__cards'>
                {transactions.map((item) => (
                    <Transaction transaction={item} openModal={openModal} key={item.transaction.id}/>
                ))}
            </div>
        </>
    )
}