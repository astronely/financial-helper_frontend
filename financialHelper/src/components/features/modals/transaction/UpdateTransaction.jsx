import {useModal} from "@/shared/hooks/useModal.js";
import {Controller, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Modal} from "@/components/features/modals/Modal.jsx";
import Select from "react-select";
import DatePicker, {registerLocale} from "react-datepicker";
import {ru} from "date-fns/locale";

export function UpdateTransaction({open = false}) {
    const requiredMessage = "Обязательно для заполнения"
    registerLocale('ru', ru)

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([
        {value: 'income', label: 'Поступление'},
        {value: 'expense', label: 'Оплата'},
        {value: 'transfer', label: 'Перевод'},
    ]);
    const [wallets, setWallets] = useState([])

    const {submitHandler, baseInfo, registerReset} = useModal();
    const {register, handleSubmit,
        reset, formState: {errors},
        watch, control, getValues} = useForm({
        defaultValues: {
            id: null,
            name: '',
            fromWalletId: null,
            toWalletId: null,
            amount: null,
            type: null,
            category: null,
            transactionDate: null,
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

        // console.log("register updateTransaction")
        // registerReset('updateTransaction', reset)
    }, [baseInfo.wallets, baseInfo.categories, reset])

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
                    transactionDate: baseInfo.data.transactionDate,
                }
            )
        }
    }, [baseInfo.data, wallets, categories, types, reset])

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <Controller
                        name='fromWalletId'
                        control={control}
                        rules={{
                            required: requiredMessage
                        }}
                        render={({field}) => (
                            <Select
                                {...field}
                                options={wallets}
                                placeholder='Кошелек для списывания'
                                isClearable
                                className={errors.fromWalletId ? 'select-error' : ''}
                            />
                        )}/>
                    {errors.fromWalletId && (
                        <div className='modal__error-message'>{errors.fromWalletId.message}</div>
                    )}
                </div>

                {
                    selectedType?.value === 'transfer' ?
                        <div>
                            <Controller
                                name='toWalletId'
                                control={control}
                                rules={{
                                    required: requiredMessage,
                                    validate: (value) => {
                                        const fromWallet = getValues('fromWalletId');
                                        return value?.value !== fromWallet?.value || "Кошелек для зачисления должен отличаться от кошелька для списывания";
                                    }
                                }}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={wallets}
                                        placeholder='Кошелек для зачисления'
                                        isClearable
                                        className={errors.toWalletId ? 'select-error' : ''}
                                    />
                                )}/>
                            {errors.toWalletId && (
                                <div className='modal__error-message'>{errors.toWalletId.message}</div>
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
                        name='transactionDate'
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
                                isClearable
                                locale='ru'
                                className={errors.transactionDate ? 'date-picker-error' : ''}
                            />
                        )}
                    />
                    {errors.transactionDate && (
                        <div className='modal__error-message'>{errors.transactionDate.message}</div>
                    )}
                </div>

                <div>
                    <input {...register('name', {
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
                           className={errors.name ? 'modal__input modal__error' : 'modal__input'}
                           placeholder='Название магазина' type='text' maxLength={50}/>
                    {errors.name && (
                        <div className='modal__error-message'>{errors.name.message}</div>
                    )}
                </div>

                <div>
                    <input {...register('amount', {
                        required: requiredMessage,
                        pattern: {
                            value: /^\d+(\.\d{1,2})?$/,
                            message: "Требуется значение формата 123.12"
                        },
                    })}
                           className={errors.amount ? 'modal__input modal__error' : 'modal__input'}
                           placeholder='Сумма операции' type='text'
                           pattern="^\d+(\.\d{1,2})?$" title='Доступны только цифры в формате 123.12' maxLength={10}/>
                    {errors.amount && (
                        <div className='modal__error-message'>{errors.amount.message}</div>
                    )}
                </div>

                <button className='modal-button' type='submit'>Изменить</button>
            </form>
        </Modal>
    )
}