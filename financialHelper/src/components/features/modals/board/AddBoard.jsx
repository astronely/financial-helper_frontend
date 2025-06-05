import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";
import {Modal} from "@/components/features/modals/Modal.jsx";

export function AddBoard({open = false}) {
    const  {submitHandler} = useModal();
    const requiredMessage = "Обязательно для заполнения"

    const {register, handleSubmit, formState: { errors}} = useForm({
        defaultValues: {
            name: '',
            description: '',
        }
    })


    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <input  {...register('name', {required: requiredMessage})} className={errors.name ? 'modal__input modal__error' : 'modal__input'} placeholder='Название доски' type='text' maxLength={30}/>
                <input {...register('description', {required: requiredMessage})} className={errors.description ? 'modal__input modal__error' : 'modal__input'} placeholder='Описание' type='text' maxLength={128}/>
                <button className='modal-button' type='submit'>Добавить</button>
            </form>
        </Modal>
    )
}