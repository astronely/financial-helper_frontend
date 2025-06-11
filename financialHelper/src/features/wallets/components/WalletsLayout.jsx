import {InfoColumn} from "@/components/ui/infoColumn/InfoColumn.jsx"
import {useEffect, useState} from "react";
import {WalletList} from "@/features/wallets/components/WalletList.jsx";
import {WalletService} from "@/features/wallets/service/walletSerivce.js"
import {useParams} from "react-router";
import "./Wallets.scss"
import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

export function WalletsLayout() {
    const [wallets, setWallets] = useState([]);
    const params = useParams()
    const {setIsActive, setModal, setSubmitHandler, setBaseInfo, updateItems, setUpdateItems} = useModal();
    const {reset} = useForm()

    const walletService = new WalletService()

    useEffect(() => {
        walletService.list(params.id)
            .then(res => {
                // console.log(res)
                setWallets(res.wallets)
            })
            .catch(err => console.error("Не удалось получить кошельки: " + err))
    }, [updateItems])

    const handleAddWallet = async data => {
        try {
            // console.log(data)
            const dataToSend = {
                info: {
                    name: data.name.trim(),
                    balance: data.balance,
                }
            }
            const response = await walletService.create(dataToSend)
            setUpdateItems(!updateItems)
            // console.log(response)
            setIsActive(false)
            reset()
        } catch (error) {
            if (error.message.includes("All fields")) {
                toast.error("Заполните все поля")
            } else if (error.status === undefined) {
                toast.error("Ошибка подключения к серверу")
            } else if (error.status === 500) {
                toast.error("Кошелек с таким именем уже есть")
            } else if (error.status !== 401) {
                toast.error("Ошибка добавления кошелька: " + error.message)
            }
            console.error("Не удалось добавить кошелек: " + error)
        }
    }

    const handleChangeWallet = async ({name, id}) => {
        try {
            const dataToSend = {
                id: id,
                info: {
                    name: name.trim(),
                }
            }
            // console.log(dataToSend)
            const response = await walletService.update(dataToSend)
            // console.log(response)
            setUpdateItems(!updateItems)
            setIsActive(false)
            reset()
        } catch (error) {
            if (error.message.includes("All fields")) {
                toast.error("Заполните все поля")
            } else if (error.status === undefined) {
                toast.error("Ошибка подключения к серверу")
            } else if (error.status === 500) {
                toast.error("Кошелек с таким именем уже есть")
            } else if (error.status !== 401) {
                toast.error("Ошибка обновления кошелька: " + error.message)
            }
            console.error("Не удалось обновить кошелек: " + error)
        }
    }

    const handleDeleteWallet = async ({id, name}) => {
        try {
            console.log("Handle delete wallet: " + id + ":" + name)
            const response = await walletService.delete(id)
            setUpdateItems(!updateItems)
            setIsActive(false)
            reset()
        } catch (error) {
            if (error.status !== 401) {
                toast.error("Ошибка удаления кошелька: " + error.message)
            }
            console.error("Не удалось удалить кошелек: " + error)
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
        } else if (modalName === "confirm") {
            setBaseInfo({name: walletName})
            setSubmitHandler(() => (data) => handleDeleteWallet({...data, id: walletID, name: walletName}))
        }
    }

    return (
        <InfoColumn>
            <div className={'column__title'}>Доступные средства</div>
            <WalletList wallets={wallets} openModal={openModal}/>
            <button onClick={() => openModal("addWallet")} className='primary-button'>Добавить</button>
            {/*<ConfirmItemDeleteModal open={modal === 'confirmDeleteWallet'} item={walletToDelete} deleteAction={deleteWallet}/>*/}
        </InfoColumn>
    )
}