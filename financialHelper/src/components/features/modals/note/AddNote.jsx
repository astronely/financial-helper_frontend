import {Modal} from "@/components/features/modals/Modal.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

export function AddNote({open = false}) {
    const  {submitHandler, registerReset} = useModal();
    const requiredMessage = "Обязательно для заполнения"

    const {register, handleSubmit,
        formState: { errors}, reset} = useForm({
        defaultValues: {
            content: '',
        }
    })

    useEffect(() => {
        // console.log("register addNote")
        registerReset('addNote', reset)
    }, [reset]);

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <textarea  {...register('content', {required: requiredMessage})}
                               className={errors.content ? 'modal__textarea modal__error' : 'modal__textarea'}
                               placeholder='Текст заметки' type='text' maxLength={1024}/>
                    {errors.content && (
                        <div className='modal__error-message'>{errors.content.message}</div>
                    )}
                </div>
                <button className='modal-button' type='submit'>Добавить</button>
            </form>
        </Modal>
    )
}