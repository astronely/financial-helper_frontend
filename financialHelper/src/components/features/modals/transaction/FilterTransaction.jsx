import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {Modal} from "@/components/features/modals/Modal.jsx";
import {useEffect, useState} from "react";
import {useModal} from "@/shared/hooks/useModal.js";

export function FilterTransaction({open = false}) {
    const requiredMessage = "Обязательно для заполнения"

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState('');
    const [wallets, setWallets] = useState([])

    const  {submitHandler, baseInfo} = useModal();

    const {register, handleSubmit, formState: { errors}, control, watch} = useForm({
        defaultValues: {
            category: null,
            transactionDate: null,
            ownerId: null,
            fromWalletId: null,
            toWalletId: null,
        }
    })

    useEffect(() => {
        if (baseInfo.wallets) {
            const options = baseInfo.wallets.map((item) => ({
                value: item.id,
                label: item.info.name,
            }))
            setWallets(options)
        }
        if (baseInfo.categories) {
            const options = baseInfo.categories.map((item) => ({
                value: item.id,
                label: item.name
            }))
            setCategories(options)
        }
    }, [baseInfo])

    return(
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>

                <Controller
                    name='fromWalletId'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={wallets} placeholder='Кошелек' isClearable/>
                    )}/>
                <Controller
                    name='category'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={categories} placeholder='Категория' isClearable/>
                    )}/>

                {/*<Controller*/}
                {/*    name='type'*/}
                {/*    control={control}*/}
                {/*    render={({field}) => (*/}
                {/*        <Select {...field} options={types} placeholder='Тип операции' isClearable/>*/}
                {/*    )}/>*/}

                <Controller
                    name="transactionDate"
                    control={control}
                    defaultValue={new Date()}
                    render={({field}) => (
                        <DatePicker
                            showIcon
                            placeholderText='Дата проведения'
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="dd-MM-yyyy"
                        />
                    )}
                />
                {/*<input  {...register('shop_name', {required: requiredMessage})}*/}
                {/*        className={errors.name ? 'modal__input modal__error' : 'modal__input'}*/}
                {/*        placeholder='Название магазина' type='text' maxLength={30}/>*/}
                {/*<input {...register('price', {required: requiredMessage})}*/}
                {/*       className={errors.price ? 'modal__input modal__error' : 'modal__input'}*/}
                {/*       placeholder='Сумма операции' type='text' maxLength={10}/>*/}

                <button className='modal-button' type='submit'>Применить</button>
            </form>
        </Modal>
    )
}