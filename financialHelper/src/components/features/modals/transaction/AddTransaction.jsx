import {useModal} from "@/shared/hooks/useModal.js";
import {Controller, useForm} from "react-hook-form";
import {Modal} from "@/components/features/modals/Modal.jsx";
import {useEffect, useState} from "react";
import Select from "react-select";
import DatePicker, {registerLocale} from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.min.css'
import {ru} from "date-fns/locale";

export function AddTransaction({open = false}) {
    const requiredMessage = "Обязательно для заполнения"

    const [date, setDate] = useState(new Date());
    const [categories, setCategories] = useState('');
    const [types, setTypes] = useState('');
    const [wallets, setWallets] = useState([])

    registerLocale('ru', ru)

    const {submitHandler, baseInfo} = useModal();

    const {register, handleSubmit,
        formState: {errors}, control,
        watch, getValues} = useForm({
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

                <div>
                    <Controller
                        name='from_wallet'
                        control={control}
                        rules={{
                            required: requiredMessage
                        }}
                        render={({field}) => (
                            <Select
                                {...field}
                                options={wallets}
                                placeholder='Кошелек'
                                isClearable
                                className={errors.from_wallet ? 'select-error' : ''}
                            />
                        )}/>
                    {errors.from_wallet && (
                        <div className='modal__error-message'>{errors.from_wallet.message}</div>
                    )}
                </div>

                {
                    selectedType?.value === 'transfer' ?
                        <div>
                            <Controller
                                name='to_wallet'
                                control={control}
                                rules={{
                                    required: requiredMessage,
                                    validate: (value) => {
                                        const fromWallet = getValues('from_wallet');
                                        return value?.value !== fromWallet?.value || "Кошелек для зачисления должен отличаться от исходного";
                                    }
                                }}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={wallets}
                                        placeholder='Кошелек для зачисления'
                                        isClearable
                                        className={errors.to_wallet ? 'select-error' : ''}
                                    />
                                )}/>
                            {errors.to_wallet && (
                                <div className='modal__error-message'>{errors.to_wallet.message}</div>
                            )}
                        </div>
                        :
                        <></>
                }

                <div>
                    <Controller
                        name='category'
                        control={control}
                        rules={{
                            required: requiredMessage
                        }}
                        render={({field}) => (
                            <Select
                                {...field}
                                options={categories}
                                placeholder='Категория'
                                isClearable
                                className={errors.category ? 'select-error' : ''}
                            />
                        )}/>
                    {errors.category && (
                        <div className='modal__error-message'>{errors.category.message}</div>
                    )}
                </div>

                <div>
                    <Controller
                        name='type'
                        control={control}
                        rules={{
                            required: requiredMessage
                        }}
                        render={({field}) => (
                            <Select
                                {...field}
                                options={types}
                                placeholder='Тип операции'
                                isClearable
                                className={errors.type ? 'select-error' : ''}
                            />
                        )}/>
                    {errors.type && (
                        <div className='modal__error-message'>{errors.type.message}</div>
                    )}
                </div>

                <div>
                    <Controller
                        name="date"
                        control={control}
                        rules={{
                            required: requiredMessage,
                        }}
                        defaultValue={new Date()}
                        render={({field}) => (
                            <DatePicker
                                showIcon
                                placeholderText='Дата проведения'
                                selected={field.value}
                                onChange={field.onChange}
                                dateFormat="dd-MM-yyyy"
                                locale='ru'
                                isClearable
                                className={errors.date ? 'date-picker-error' : ''}
                            />
                        )}
                    />
                    {errors.date && (
                        <div className='modal__error-message'>{errors.date.message}</div>
                    )}
                </div>

                <div>
                    <input {...register('shop_name', {
                        required: requiredMessage,
                        minLength: {
                            value: 1,
                            message: "Минимум 1 символ"
                        },
                        maxLength: {
                            value: 50,
                            message: "Максимум 50 символов"
                        }
                    })}
                           className={errors.shop_name ? 'modal__input modal__error' : 'modal__input'}
                           placeholder='Название магазина' type='text' maxLength={50}/>
                    {errors.shop_name && (
                        <div className='modal__error-message'>{errors.shop_name.message}</div>
                    )}
                </div>

                <div>
                    <input {...register('price', {
                        required: requiredMessage,
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Требуется значение формата 123.12"
                        },
                    })}
                           className={errors.price ? 'modal__input modal__error' : 'modal__input'}
                           placeholder='Сумма операции' type='text'
                           pattern="^\d+(\.\d{1,2})?$" title='Доступны только цифры в формате 123.12' maxLength={10}/>
                    {errors.price && (
                        <div className='modal__error-message'>{errors.price.message}</div>
                    )}
                </div>

                <button className='modal-button' type='submit'>Добавить</button>
            </form>
        </Modal>
    )
}