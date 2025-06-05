import {UserRepository} from "@/features/users/repository/userRepository.js";

export class UserService {
    constructor(repo = new UserRepository()) {
        this.repo = repo;
    }

    async loginUser(data) {
        if (!data.email || !data.password) throw new Error('All fields are required')
        return await this.repo.login(data);
    }

    async logout() {
        return await this.repo.logout();
    }

    async registerUser(data) {
        if (!data.email || !data.name || !data.password) throw new Error('All fields are required')
        return await this.repo.register(data);
    }

    async get(id) {
        // if (!id) throw new Error('All fields are required')
        return await this.repo.getUser(id)
    }

    async update(data) {
        if (!data.id || !data.info.name) throw new Error('All fields are required')
        return await this.repo.update(data)
    }
}