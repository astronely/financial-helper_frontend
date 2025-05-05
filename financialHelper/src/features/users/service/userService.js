import {UserRepository} from "@/features/users/repository/userRepository.js";

export class UserService {
    constructor(repo = new UserRepository()) {
        this.repo = repo;
    }

    async loginUser(data) {
        if (!data.email || !data.password) throw new Error('All fields are required')
        return await this.repo.login(data)
    }

    async registerUser(data) {
        if (!data.email || !data.name || !data.password) throw new Error('All fields are required')
        return await this.repo.register(data)
    }
}