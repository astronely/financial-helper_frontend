import {useModal} from "@/shared/hooks/useModal.js";
import {Controller, useForm} from "react-hook-form";
import {Modal} from "@/components/features/modals/Modal.jsx";
import {useEffect, useState} from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.min.css'

export function AddTransaction({open = false}) {
    const requiredMessage = "Обязательно для заполнения"

    const [date, setDate] = useState(new Date());
    const [categories, setCategories] = useState('');
    const [types, setTypes] = useState('');
    const [wallets, setWallets] = useState([])

    const  {submitHandler, baseInfo} = useModal();

    const {register, handleSubmit, formState: { errors}, control, watch} = useForm({
        defaultValues: {
            from_wallet: null,
            to_wallet: null,
            shop_name: '',
            price: '',
            category: null,
            type: null,
            date: new Date(),
        }
    })

    const selectedType = watch('type')

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
        setTypes([
            {value: 'income', label: 'Поступление'},
            {value: 'expense', label: 'Оплата'},
            {value: 'transfer', label: 'Перевод'},
        ])
    }, [baseInfo])

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>

                <Controller
                    name='from_wallet'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={wallets} placeholder='Кошелек' isClearable/>
                    )}/>
                {
                    selectedType?.value === 'transfer' ?
                        <Controller
                            name='to_wallet'
                            control={control}
                            render={({field}) => (
                                <Select {...field} options={wallets} placeholder='Кошелек для зачисления' isClearable/>
                            )}/>
                        :
                        <></>
                }
                <Controller
                    name='category'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={categories} placeholder='Категория' isClearable/>
                    )}/>

                <Controller
                    name='type'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={types} placeholder='Тип операции' isClearable/>
                    )}/>

                <Controller
                    name="date"
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
                <input  {...register('shop_name', {required: requiredMessage})}
                        className={errors.name ? 'modal__input modal__error' : 'modal__input'}
                        placeholder='Название магазина' type='text' maxLength={30}/>
                <input {...register('price', {required: requiredMessage})}
                       className={errors.price ? 'modal__input modal__error' : 'modal__input'}
                       placeholder='Сумма операции' type='text' maxLength={10}/>

                <button className='modal-button' type='submit'>Добавить</button>
            </form>
        </Modal>
    )
}