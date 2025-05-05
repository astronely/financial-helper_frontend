export const ToCreateUser = (data) => (
    {
    info: {
        email: data.email,
        name: data.name,
    },
    password: data.password,
})

export const ToUpdateUser = (data) => ({
    id: data.id,
    info: {
        email: data.email,
        name: data.name,
        password: data.password,
    },
})

export const ToLogin = (data) => ({
    email: data.email,
    password: data.password,
})

export const ToUser = (data) => ({
    name: data.name
})