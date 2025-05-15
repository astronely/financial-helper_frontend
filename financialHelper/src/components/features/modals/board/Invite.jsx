import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";
import {Modal} from "@/components/features/modals/Modal.jsx";
import {Copy, CopyIcon} from "lucide-react"
import {useState} from "react";
import {toast} from "react-toastify";

export function Invite({open = false}) {
    const  {setIsActive, baseInfo} = useModal();
    // const [setCopied] = useState(false);

    const handleCopy = async () => {
        if (baseInfo?.inviteUrl) {
            try {
                await navigator.clipboard.writeText(baseInfo.inviteUrl);
                // setCopied(true);
                toast.success("Ссылка скопирована в буфер обмена")
                // setTimeout(() => setCopied(false), 2000);
            } catch (error) {
                console.error("Ошибка при копировании: " + error)
            }
        }
    };

    return(
        <Modal open={open}>
            <div className='modal__form'>
                <div className='modal__text'>Ссылка для приглашения:</div>
                <div className='modal__invite-container'>
                    <span className='modal__invite-url'>{baseInfo ? baseInfo.inviteUrl : "Nothing"}</span>
                    <CopyIcon className='modal__invite-icon-copy' onClick={handleCopy}/>
                </div>
                <button className='modal-button' onClick={() => setIsActive(false)}>Закрыть</button>
            </div>
        </Modal>
    )
}