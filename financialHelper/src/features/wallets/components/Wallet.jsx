import {CircleX, Pen} from 'lucide-react'
import "./WalletCard.scss"
import styles from "./WalletCard.module.scss"

export function Wallet({wallet, openModal}) {
    return (
        <div className={styles.wallet__card}>
            <div className={"wallet__info"}>
                <div className='text-with-icon'>
                    {wallet.info.name}
                    <button onClick={() => openModal('updateWallet', wallet.id, wallet.info.name)} className="icon-button icon-button__pen"><Pen/></button>
                </div>
                <div className={'wallet__text'}>{wallet.info.balance} RUB</div>
            </div>
            <button onClick={() => openModal('confirm', wallet.id, wallet.info.name)} className="icon-button icon-button__cross"><CircleX/></button>
        </div>
    )
}