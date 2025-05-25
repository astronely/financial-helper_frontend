import {Modal} from "@/components/features/modals/Modal.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";

export function AddNote({open = false}) {
    const  {submitHandler} = useModal();
    const requiredMessage = "Обязательно для заполнения"

    const {register, handleSubmit, formState: { errors}} = useForm({
        defaultValues: {
            content: '',
        }
    })

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <textarea  {...register('content', {required: requiredMessage})} className={errors.name ? 'modal__textarea modal__error' : 'modal__textarea'} placeholder='Текст заметки' type='text' maxLength={1024}/>
                <button className='modal-button' type='submit'>Добавить</button>
            </form>
        </Modal>
    )
}