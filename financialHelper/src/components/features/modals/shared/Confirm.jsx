import {useModal} from "@/shared/hooks/useModal.js";
import {Modal} from "@/components/features/modals/Modal.jsx";
import {useForm} from "react-hook-form";

export function ConfirmDelete({open = false}) {
    const {setIsActive, baseInfo, submitHandler} = useModal();
    const {handleSubmit} = useForm()

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <div className='modal__form'>
                    <div className='modal__text'>Вы уверены что хотите удалить {baseInfo.name}?</div>
                    <div className='modal__buttons'>
                        <button className='modal-button' type="button" onClick={() => setIsActive(false)}>Отменить</button>
                        <button className='modal-button' type='submit'>Удалить
                        </button>
                    </div>
                </div>
            </form>

        </Modal>
    )
}