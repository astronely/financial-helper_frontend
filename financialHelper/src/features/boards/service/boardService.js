import {BoardRepository} from "@/features/boards/repository/boardRepository.js";

export class BoardService {
    constructor(repo = new BoardRepository()) {
        this.repo = repo;
    }

    async get(data) {
        if (!data.boardID) throw new Error('All fields are required')
        return await this.repo.get(data.boardID)
    }

    // async listByOwnerId(data) {
    //     if (!data.ownerID) throw new Error('All fields are required')
    //     return await this.repo.listByOwnerID(data.ownerID)
    // }

    async listByUserId() {
        // if (!data.userID) throw new Error('All fields are required')
        console.log("IN SERVICE")
        return await this.repo.listByUserID()
    }

    async create(data) {
        if (!data.name || !data.description) throw new Error('All fields are required')
        return await this.repo.create(data)
    }

    async set(data) {
        return await this.repo.set(data)
    }

    async invite() {
        return await this.repo.invite()
    }

    async update(data) {
        return await this.repo.update(data)
    }

    async delete(id) {
        return await this.repo.delete(id)
    }

    async getBoardUsers(boardID) {
        return await this.repo.boardUsers(boardID)
    }

    async deleteUser(userID) {
        return await this.repo.deleteUser(userID)
    }
}