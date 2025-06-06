import {useEffect, useState} from "react";
import {useModal} from "@/shared/hooks/useModal.js";
import {Controller, useForm} from "react-hook-form";
import {Modal} from "@/components/features/modals/Modal.jsx";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {BoardService} from "@/features/boards/service/boardService.js";
import {useParams} from "react-router";
import {UserService} from "@/features/users/service/userService.js";
import {all} from "axios";

export function FilterNote({open = false}) {
    const [users, setUsers] = useState([]);

    const {submitHandler, baseInfo, updateItems, setUpdateItems} = useModal();

    const {handleSubmit, control} = useForm({
        defaultValues: {
            ownerId: null,
            performerId: null,
            status: null,
            completionDateStart: null,
            completionDateEnd: null,
            createdAtStart: null,
            createdAtEnd: null,
        }
    })

    const statuses = [
        {
            value: true,
            label: 'Выполнена'
        },
        {
            value: false,
            label: 'Не выполнена'
        }
    ]

    const boardService = new BoardService();
    const userService = new UserService();
    const params = useParams();

    useEffect(() => {
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

    return (
        <Modal open={open}>
            <form className='modal__form' onSubmit={handleSubmit(submitHandler)}>

                <Controller
                    name='ownerId'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={users} placeholder='Создатель заметки' isClearable/>
                    )}/>
                <Controller
                    name='performerId'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={users} placeholder='Выполнил заметку' isClearable/>
                    )}/>

                <Controller
                    name='status'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={statuses} placeholder='Статус заметки' isClearable/>
                    )}/>

                <Controller
                    name="completionDateStart"
                    control={control}
                    defaultValue={new Date()}
                    render={({field}) => (
                        <DatePicker
                            showIcon
                            placeholderText='Дата выполнения от'
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="dd-MM-yyyy"
                        />
                    )}
                />

                <Controller
                    name="completionDateEnd"
                    control={control}
                    defaultValue={new Date()}
                    render={({field}) => (
                        <DatePicker
                            showIcon
                            placeholderText='Дата выполнения до'
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="dd-MM-yyyy"
                        />
                    )}
                />

                <Controller
                    name="createdAtStart"
                    control={control}
                    defaultValue={new Date()}
                    render={({field}) => (
                        <DatePicker
                            showIcon
                            placeholderText='Дата создания от'
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="dd-MM-yyyy"
                        />
                    )}
                />

                <Controller
                    name="createdAtEnd"
                    control={control}
                    defaultValue={new Date()}
                    render={({field}) => (
                        <DatePicker
                            showIcon
                            placeholderText='Дата создания до'
                            selected={field.value}
                            onChange={field.onChange}
                            dateFormat="dd-MM-yyyy"
                        />
                    )}
                />
                <button className='modal-button' type='submit'>Применить</button>
            </form>
        </Modal>
    )
}