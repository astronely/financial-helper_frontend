import {Transaction} from "@/features/transactions/components/Transaction.jsx";

export function TransactionList({transactions, openModal}) {

    return (
        <>
            <div className='history__header'>
                <div>Все операции</div>
                {/*<img src="icons/list.svg"/>*/}
            </div>
            <div className='history__cards'>
                {transactions.map((item) => (
                    <Transaction transaction={item} openModal={openModal} key={item.transaction.id}/>
                ))}
            </div>
        </>
    )
}