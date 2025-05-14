import {useModal} from "@/shared/hooks/useModal.js";
import {CircleX, Pen} from 'lucide-react'
import "./WalletCard.scss"
import styles from "./WalletCard.module.scss"

export function Wallet({wallet, openModal}) {

    // console.log(wallet)
    return (
        <div className={styles.wallet__card}>
            <div className={"wallet__info"}>
                <div className={'wallet__text'}>
                    {wallet.info.name}
                    <button onClick={() => openModal('updateWallet', wallet.id, wallet.info.name)} className={"wallet__button wallet__pen"}><Pen/></button>
                </div>
                <div className={'wallet__text'}>{wallet.info.balance}</div>
            </div>
            <button className={"wallet__button wallet__cross"}><CircleX/></button>
        </div>
    )
    // return (
    //     <div className={styles.wallet__card}>
    //         <div className={"wallet__info"}>
    //             <div className={'wallet__text'}>
    //                 {wallet.name}
    //                 <button onClick={() => changeAction(wallet)} className={"wallet__button wallet__pen"}><Pen/></button>
    //             </div>
    //             <div className={'wallet__text'}>{wallet.value} {wallet.currency}</div>
    //         </div>
    //         <button onClick={() => confirmDelete(setIsActive, setModal, 'confirmDeleteWallet', wallet.name, setWalletToDelete)} className={"wallet__button wallet__cross"}><CircleX/></button>
    //     </div>
    // )
}