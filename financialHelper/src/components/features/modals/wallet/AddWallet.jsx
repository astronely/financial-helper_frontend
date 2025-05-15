import {Modal} from "@/components/features/modals/Modal.jsx";
import {useForm} from "react-hook-form";
import {useModal} from "@/shared/hooks/useModal.js";
import {ErrorMessage} from "@hookform/error-message";

export function AddWallet({open = false}) {
    const  {setIsActive, submitHandler} = useModal();
    const requiredMessage = "Обязательно для заполнения"

    const {register, handleSubmit, reset, formState: { errors}} = useForm({
        defaultValues: {
            name: '',
            balance: '',
        }
    })

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <input  {...register('name', {required: requiredMessage})} className={errors.name ? 'modal__input modal__error' : 'modal__input'} placeholder='Название кошелька' type='text' maxLength={30}/>
                <input {...register('balance', {required: requiredMessage})} className={errors.balance ? 'modal__input modal__error' : 'modal__input'} placeholder='Баланс' type='text' maxLength={10}/>
                <button className='modal-button' type='submit'>Добавить</button>
            </form>
        </Modal>
    )
}