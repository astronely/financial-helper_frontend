import {BoardRepository} from "@/features/boards/repository/boardRepository.js";

export class BoardService {
    constructor(repo = new BoardRepository()) {
        this.repo = repo;
    }

    async get(data) {
        if (!data.boardID) throw new Error('All fields are required')
        return await this.repo.get(data.boardID)
    }

    async listByOwnerId(data) {
        if (!data.ownerID) throw new Error('All fields are required')
        return await this.repo.listByOwnerID(data.ownerID)
    }

    async listByUserId(data) {
        if (!data.userID) throw new Error('All fields are required')
        return await this.repo.listByUserID(data.userID)
    }

    async create(data) {
        if (!data.name || !data.description || !data.ownerID) throw new Error('All fields are required')
        return await this.repo.create(ToCreateBoard(data))
    }
}