import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {Modal} from "@/components/features/modals/Modal.jsx";
import {useEffect, useState} from "react";
import {useModal} from "@/shared/hooks/useModal.js";
import {BoardService} from "@/features/boards/service/boardService.js";
import {UserService} from "@/features/users/service/userService.js";
import {useParams} from "react-router";
import {all} from "axios";

export function FilterTransaction({open = false}) {
    const [categories, setCategories] = useState([]);
    const [wallets, setWallets] = useState([])
    const [users, setUsers] = useState([]);
    const types = [
        {
            value: "expense",
            label: "Оплата"
        },
        {
            value: "income",
            label: "Пополнение"
        },
        {
            value: "transfer",
            label: "Перевод"
        },
    ]

    const  {submitHandler, baseInfo} = useModal();

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            category: null,
            transactionDate: null,
            transactionDateEnd: null,
            type: null,
            ownerId: null,
            fromWalletId: null,
            toWalletId: null,
            name: null,
        }
    })

    const boardService = new BoardService();
    const userService = new UserService();
    const params = useParams();

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

        boardService.getBoardUsers(params.id)
            .then(res => {
                all(
                    res.users.map(item =>
                        userService.get(item.userId)
                            .then(resp => ({
                                value: resp?.user?.id,
                                label: resp?.user?.info?.name
                            }))
                    )
                )
                    .then(userList => {
                        const uniqueUsers = Array.from(
                            new Map(userList.map(u => [u.value, u])).values()
                        );
                        setUsers(uniqueUsers);
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err));
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

                <Controller
                    name='type'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={types} placeholder='Тип операции' isClearable/>
                    )}/>

                <Controller
                    name="transactionDate"
                    control={control}
                    defaultValue={new Date()}
                    render={({field}) => (
                        <DatePicker
                            showIcon
                            placeholderText='Дата проведения с'
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="dd-MM-yyyy"
                        />
                    )}
                />

                <Controller
                    name="transactionDateEnd"
                    control={control}
                    defaultValue={new Date()}
                    render={({field}) => (
                        <DatePicker
                            showIcon
                            placeholderText='Дата проведения до'
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="dd-MM-yyyy"
                        />
                    )}
                />

                <input  {...register('name')}
                        className='modal__input'
                        placeholder='Название магазина' type='text' maxLength={128}/>

                <button className='modal-button' type='submit'>Применить</button>
            </form>
        </Modal>
    )
}