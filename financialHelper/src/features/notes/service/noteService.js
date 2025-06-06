import {NoteRepository} from "@/features/notes/repository/noteRepository.js";


export class NoteService {
    constructor(repo = new NoteRepository()) {
        this.repo = repo;
    }

    async get(noteID) {
        if (!noteID) throw new Error('NoteID is required')
        const response = await this.repo.get(noteID)
        return response
    }

    async list(boardID) {
        if (!boardID) throw new Error('BoardID is required')
        const response = await this.repo.list(boardID)
        return response
    }

    async listFilter(boardID, queryParams) {
        if (!boardID) throw new Error('All fields are required')
        const response = await this.repo.listFilter(boardID, queryParams)
        return response
    }

    async create(data) {
        if (!data.info.content) throw new Error('Content is required')
        const response = await this.repo.create(data)
        return response
    }

    async complete(data) {
        if (!data.id) throw new Error('ID & status is required')
        const response = await this.repo.complete(data)
        return response
    }

    async update(data) {
        if (!data.id || !data.content) throw new Error('ID & Content is required')
        const response = await this.repo.update(data)
        return response
    }

    async delete(noteID) {
        if (!noteID) throw new Error('NoteID is required')
        const response = await this.repo.delete(noteID)
        return response
    }
}