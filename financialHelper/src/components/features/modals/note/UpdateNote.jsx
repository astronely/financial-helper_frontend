import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";
import {Modal} from "@/components/features/modals/Modal.jsx";
import {useEffect} from "react";

export function UpdateNote({open = false}) {
    const  {submitHandler, baseInfo} = useModal();
    const requiredMessage = "Обязательно для заполнения"

    const {register, handleSubmit, formState: { errors}, reset} = useForm({
        defaultValues: {
            id: baseInfo.id,
            content: baseInfo.content,
        }
    })

    useEffect(() => {
        if (baseInfo) {
            reset({
                id: baseInfo.id,
                content: baseInfo.content,
            })
        }
    }, [baseInfo])

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <textarea  {...register('content', {required: requiredMessage})} className={errors.name ? 'modal__textarea modal__error' : 'modal__textarea'} placeholder='Текст заметки' type='text' maxLength={1024}/>
                <button className='modal-button' type='submit'>Изменить</button>
            </form>
        </Modal>
    )
}