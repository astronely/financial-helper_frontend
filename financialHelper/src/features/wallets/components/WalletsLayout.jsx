import {InfoColumn} from "@/components/ui/infoColumn/InfoColumn.jsx"
import {useModal} from "@/shared/hooks/useModal.js";
import {useEffect, useState} from "react";
import {openConfirm, openModal} from "@/shared/utils/modalUtils.js";
import {Wallet} from "@/features/wallets/components/Wallet.jsx";
import {useApp} from "@/shared/hooks/useApp.js";
import {WalletList} from "@/features/wallets/components/WalletList.jsx";
import {useWallet} from "@/features/wallets/hooks/useWallet.js";

export function Wallets() {
    // const {wallets, setWallets, updateWallets} = useApp();
    // const  {setIsActive, setModal, modal} = useModal();
    // const [walletToUpdate, setWalletToUpdate] = useState(Object());
    // const [walletToDelete, setWalletToDelete] = useState('');

    // async function deleteWallet(name){
    //     setWallets(w => w.filter(item => item.name !== name))
    //
    //     await axios.delete("http://localhost:8080/api/wallets/delete",{
    //         data: {
    //             name: name,
    //         },
    //         withCredentials: true},)
    //         .then(() => {
    //             toast.success("Кошелек успешно удален")
    //         })
    //         .catch(error => {
    //             toast.error("Кошелек не был удален")
    //             console.log(error.response)
    //         })
    // }
    //
    // const changeWallet = wallet => {
    //     setWalletToUpdate(wallet)
    //     // console.log("wallet to update: ", walletToUpdate)
    //     openModal(setIsActive, setModal, "changeWallet")
    // }
    //
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         updateWallets().then()
    //         wallets.sort((a, b) => a.id - b.id)
    //     }, 0)
    //
    //     return () => clearTimeout(timeout)
    // }, [])
    // const { wallets, loading, error } => useWallet(boardID)

    return (
        <InfoColumn>
            <div className={'column__title'}>Доступные средства</div>
            <WalletList/>
            <button className={'primary-button'}>Добавить</button>
            {/*<AddWalletModal open={modal === 'addWallet'} wallets={wallets} setWallets={setWallets}/>*/}
            {/*<ChangeWalletModal open={modal === 'changeWallet'} current={walletToUpdate}/>*/}
            {/*<ConfirmItemDeleteModal open={modal === 'confirmDeleteWallet'} item={walletToDelete} deleteAction={deleteWallet}/>*/}
        </InfoColumn>
    )
}