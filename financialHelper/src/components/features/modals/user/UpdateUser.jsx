import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {Modal} from "@/components/features/modals/Modal.jsx";

export function UpdateUser({open = false}) {
    const requiredMessage = "Обязательно для заполнения"
    const  {submitHandler, baseInfo} = useModal();

    const {register, handleSubmit, formState: { errors}, reset} = useForm({
        defaultValues: {
            id: baseInfo.id,
            name: baseInfo.name,
        }
    })

    useEffect(() => {
        // console.log("BASE INFO")
        // console.log(baseInfo)
        if (baseInfo) {
            reset({
                id: baseInfo.id,
                name: baseInfo.name,
            })
        }
    }, [baseInfo, reset])

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <input  {...register('name', {required: requiredMessage})} className={errors.name ? 'modal__input modal__error' : 'modal__input'} placeholder='Имя пользователя' type='text' maxLength={30}/>
                <button className='modal-button' type='submit'>Изменить</button>
            </form>
        </Modal>
    )
}