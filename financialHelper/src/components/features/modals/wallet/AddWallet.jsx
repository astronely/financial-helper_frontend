import {Modal} from "@/components/features/modals/Modal.jsx";
import {useForm} from "react-hook-form";
import {useModal} from "@/shared/hooks/useModal.js";
import {ErrorMessage} from "@hookform/error-message";
import {useEffect} from "react";

export function AddWallet({open = false}) {
    const {submitHandler, registerReset} = useModal();
    const requiredMessage = "Обязательно для заполнения"

    const {register, handleSubmit,
        formState: {errors}, reset} = useForm({
        defaultValues: {
            name: '',
            balance: '',
        }
    })

    useEffect(() => {
        // console.log("register addWallet")
        registerReset('addWallet', reset)
    }, [reset])

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <input  {...register('name', {
                        required: requiredMessage,
                        minLength: {
                            value: 1,
                            message: "Минимум 1 символ"
                        }
                    })} className={errors.name ? 'modal__input modal__error' : 'modal__input'}
                            placeholder='Название кошелька' type='text' maxLength={30}/>
                    {errors.name && (
                        <div className='modal__error-message'>{errors.name.message}</div>
                    )}
                </div>
                <div>
                    <input {...register('balance', {
                        required: requiredMessage,
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Требуется значение формата 123.12"
                        }
                    })} className={errors.balance ? 'modal__input modal__error' : 'modal__input'} placeholder='Баланс'
                           type='text'
                           pattern="^\d+(\.\d{1,2})?" title='Доступны только значения в формате 123.12' maxLength={10}/>
                    {errors.balance && (
                        <div className='modal__error-message'>{errors.balance.message}</div>
                    )}
                </div>
                <button className='modal-button' type='submit'>Добавить</button>
            </form>
        </Modal>
    )
}