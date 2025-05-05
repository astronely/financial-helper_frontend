import {get, create} from "@/api/userApi.js";
import {login} from "@/api/authApi.js"
import {ToCreateUser, ToLogin, ToUser} from "@/api/models/user.js";

export class UserRepository {
    async getUser(userID) {
        const { data } = await get(userID)
        return ToUser(data)
    }

    async login(data) {
        const response = await login(ToLogin(data))
        // console.log("UserRepo:", data)
        return response
    }

    async register(data) {
        const response = await create(ToCreateUser(data))
        return response
    }
}