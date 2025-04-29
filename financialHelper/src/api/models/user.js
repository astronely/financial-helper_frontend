export const toCreateUser = (data) => (
    {
    info: {
        email: data.email,
        name: data.name,
    },
    password: data.password,
})

export const toUpdateUser = (data) => ({
    id: data.id,
    info: {
        email: data.email,
        name: data.name,
        password: data.password,
    },
})

export const toLogin = (email, password) => ({
    email: email,
    password: password,
})