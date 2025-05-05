import {useModal} from "@/shared/hooks/useModal.js";
import "./WalletCard.scss"
import "./WalletCard.module.scss"

export function Wallet({wallet, confirmDelete, setWalletToDelete, changeAction}) {
    const  {setIsActive, setModal} = useModal();
    // console.log(wallet)
    return (
        <div className={styles.wallet__card}>
            <div className={"wallet__info"}>
                <div className={'wallet__text'}>
                    {wallet.name}
                    <button onClick={() => changeAction(wallet)} className={"wallet__button wallet__pen"}><Pen/></button>
                </div>
                <div className={'wallet__text'}>{wallet.value} {wallet.currency}</div>
            </div>
            <button onClick={() => confirmDelete(setIsActive, setModal, 'confirmDeleteWallet', wallet.name, setWalletToDelete)} className={"wallet__button wallet__cross"}><CircleX/></button>
        </div>
    )
}