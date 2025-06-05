import {get, create, update} from "@/api/userApi.js";
import {login, logout} from "@/api/authApi.js"
import {ToCreateUser, ToLogin, ToUser} from "@/api/models/user.js";

export class UserRepository {
    async getUser(userID) {
        const data = await get(userID)
        return data
    }

    async login(data) {
        const response = await login(ToLogin(data));
        // console.log("UserRepo:", data)
        return response;
    }

    async logout() {
        const response = await logout();
        return response;
    }

    async register(data) {
        const response = await create(ToCreateUser(data));
        return response;
    }

    async update(data) {
        const response = await update(data);
        return response;
    }
}