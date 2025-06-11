import {Modal} from "@/components/features/modals/Modal.jsx";
import {useForm} from "react-hook-form";
import {useModal} from "@/shared/hooks/useModal.js";
import {ErrorMessage} from "@hookform/error-message";

export function AddWallet({open = false}) {
    const {submitHandler} = useModal();
    const requiredMessage = "Обязательно для заполнения"

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            balance: '',
        }
    })

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <input  {...register('name', {required: requiredMessage})}
                        className={errors.name ? 'modal__input modal__error' : 'modal__input'}
                        placeholder='Название кошелька' type='text' maxLength={30}/>
                <input {...register('balance', {
                    required: requiredMessage,
                    pattern: {
                        value: /^\d+(\.\d{2})?$/,
                        message: "Доступны только цифры"
                    }
                })} className={errors.balance ? 'modal__input modal__error' : 'modal__input'} placeholder='Баланс'
                       type='text'
                       pattern="^\d+(\.\d{2})?" title='Доступны только цифры в формате 123.12' maxLength={10}/>
                <button className='modal-button' type='submit'>Добавить</button>
            </form>
        </Modal>
    )
}