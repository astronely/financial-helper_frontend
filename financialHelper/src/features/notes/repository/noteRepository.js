import {get, list, create, del, update, listFilter, complete} from "@/api/noteApi.js"

export class NoteRepository {
    async get(noteID) {
        const response = await get(noteID);
        return response;
    }

    async list(boardID) {
        const response = await list(boardID);
        return response;
    }

    async listFilter(boardId, queryParams) {
        const response = await listFilter(boardId, queryParams);
        return response;
    }

    async complete(data) {
        const response = await complete(data);
    }

    async create(data) {
        const response = await create(data);
        return response;
    }

    async update(data) {
        const response = await update(data);
        return response;
    }

    async delete(noteID) {
        const response = await del(noteID);
        return response;
    }
}