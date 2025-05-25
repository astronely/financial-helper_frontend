import {useModal} from "@/shared/hooks/useModal.js";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Modal} from "@/components/features/modals/Modal.jsx";
import Select from "react-select";
import DatePicker from "react-datepicker";

export function UpdateTransaction({open = false}) {
    const requiredMessage = "Обязательно для заполнения"

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([
        {value: 'income', label: 'Поступление'},
        {value: 'expense', label: 'Оплата'},
        {value: 'transfer', label: 'Перевод'},
    ]);
    const [wallets, setWallets] = useState([])

    const  {submitHandler, baseInfo} = useModal();
    const {register, handleSubmit, reset, formState: { errors}, watch, control} = useForm({
        defaultValues: {
            id: null,
            name: '',
            fromWalletId: null,
            toWalletId: null,
            amount: null,
            type: null,
            category: null,
        }
    })

    const selectedType = watch('type')

    useEffect(() => {
        if (baseInfo.categories) {
            const options = baseInfo.categories.map((item) => ({
                value: item.id,
                label: item.name
            }))
            setCategories(options)
        }
        if (baseInfo?.wallets) {
            const options = baseInfo.wallets.map((item) => ({
                value: item.id,
                label: item.info.name,
            }))
            setWallets(options)
        }
    }, [baseInfo.wallets, baseInfo.categories])

    useEffect(() => {
        if (baseInfo?.data) {
            console.log(baseInfo.data)
            reset(
                {
                    id: baseInfo.data.id,
                    name: baseInfo.data.name,
                    amount: baseInfo.data.amount,
                    fromWalletId: wallets.find(w => w.value === baseInfo.data.fromWalletId),
                    toWalletId: wallets.find(w => w.value === baseInfo.data.toWalletId),
                    type: types.find(t => t.value === baseInfo.data.type),
                    category: categories.find(c => c.value === baseInfo.data.category),
                }
            )
        }
    }, [baseInfo.data, wallets, categories, reset])

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <Controller
                    name='fromWalletId'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={wallets} placeholder='Кошелек для списывания' isClearable/>
                    )}/>
                {
                    selectedType?.value === 'transfer' ?
                        <Controller
                            name='toWalletId'
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

                {/*<Controller*/}
                {/*    name="date"*/}
                {/*    control={control}*/}
                {/*    defaultValue={new Date()}*/}
                {/*    render={({field}) => (*/}
                {/*        <DatePicker*/}
                {/*            showIcon*/}
                {/*            placeholderText='Дата проведения'*/}
                {/*            selected={field.value}*/}
                {/*            onChange={field.onChange}*/}
                {/*            dateFormat="dd-MM-yyyy"*/}
                {/*        />*/}
                {/*    )}*/}
                {/*/>*/}
                <input  {...register('name', {required: requiredMessage})}
                        className={errors.name ? 'modal__input modal__error' : 'modal__input'}
                        placeholder='Название магазина' type='text' maxLength={30}/>
                <input {...register('amount', {required: requiredMessage})}
                       className={errors.price ? 'modal__input modal__error' : 'modal__input'}
                       placeholder='Сумма операции' type='text' maxLength={10}/>
                <button className='modal-button' type='submit'>Изменить</button>
            </form>
        </Modal>
    )
}