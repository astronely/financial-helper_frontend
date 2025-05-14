import {Modal} from "@/components/features/modals/Modal.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

export function UpdateWallet({open = false}) {
    const  {submitHandler, baseInfo} = useModal();

    const {register, handleSubmit, reset, formState: { errors}} = useForm({
        defaultValues: {
            name: '',
        }
    })

    useEffect(() => {
        if (baseInfo?.name) {
            reset({name: baseInfo.name});
        }
    }, [baseInfo, reset])

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <input  {...register('name')} className='modal__input'
                        placeholder='Название' type='text'/>
                <button className='modal-button' type='submit'>Изменить</button>
                {/*<ErrorMessage errors={errors} name="balance" render={({message}) => <p className='modal__error'>{message}</p>} />*/}
            </form>
        </Modal>
    )
}