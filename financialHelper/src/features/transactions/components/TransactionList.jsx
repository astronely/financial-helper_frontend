import {Transaction} from "@/features/transactions/components/Transaction.jsx";

export function TransactionList({transactions}) {

    return (
        <>
            <div className={'history__header'}>
                <div>Все операции</div>
                {/*<img src="icons/list.svg"/>*/}
            </div>
            <div className={'history__cards'}>
                {transactions.map((item, index) => (
                    <Transaction transaction={item} key={index}/>
                ))}
            </div>
        </>
    )
}