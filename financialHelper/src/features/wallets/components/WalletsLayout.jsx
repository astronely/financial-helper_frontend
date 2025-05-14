import {InfoColumn} from "@/components/ui/infoColumn/InfoColumn.jsx"
import {useEffect, useState} from "react";
import {WalletList} from "@/features/wallets/components/WalletList.jsx";
import {WalletService} from "@/features/wallets/service/walletSerivce.js"
import {useParams} from "react-router";
import "./Wallets.scss"
import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";

export function WalletsLayout() {
    const [wallets, setWallets] = useState([]);
    const [walletChanged, setWalletChanged] = useState(false);

    const params = useParams()

    const {setIsActive, setModal, setSubmitHandler, setBaseInfo, baseInfo} = useModal();
    const {reset} = useForm()

    const walletService = new WalletService()

    useEffect(() => {
        walletService.list(params.id)
            .then(res => {
                // console.log(res)
                setWallets(res.wallets)
            })
            .catch(err => console.error("Не удалось получить кошельки: " + err))
    }, [walletChanged])

    const handleAddWallet = async data => {
        try {
            // console.log(data)
            const dataToSend = {
                info: {
                    ownerId: localStorage.getItem("userID"),
                    boardId: params.id,
                    name: data.name,
                    balance: data.balance,
                }
            }
            const response = await walletService.create(dataToSend)
            setWalletChanged(!walletChanged)
            // console.log(response)
            setIsActive(false)
            reset()
        } catch (error) {
            console.error("Не удалось добавить кошелек: " + error)
        }
    }

    const handleChangeWallet = async ({name, id}) => {
        try {
            const dataToSend = {
                id: id,
                info: {
                    name: name,
                }
            }
            // console.log(dataToSend)
            const response = await walletService.update(dataToSend)
            // console.log(response)
            setWalletChanged(!walletChanged)
            setIsActive(false)
            reset()
        } catch (error) {
            console.error("Не удалось обновить кошелек: " + error)
        }
    }

    function openModal(modalName, walletID, walletName) {
        setIsActive(true)
        setModal(modalName)

        if (modalName === "addWallet") {
            setSubmitHandler(() => handleAddWallet)
        } else if (modalName === "updateWallet") {
            setBaseInfo({name: walletName})
            setSubmitHandler(() => (data) => handleChangeWallet({...data, id: walletID}))
        }
    }

    return (
        <InfoColumn>
            <div className={'column__title'}>Доступные средства</div>
            <WalletList wallets={wallets} openModal={openModal}/>
            <button onClick={() => openModal("addWallet")} className={'primary-button'}>Добавить</button>
            {/*<ConfirmItemDeleteModal open={modal === 'confirmDeleteWallet'} item={walletToDelete} deleteAction={deleteWallet}/>*/}
        </InfoColumn>
    )
}