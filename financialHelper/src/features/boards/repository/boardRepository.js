import {listByOwnerID, listByUserID, get, create} from "@/api/boardApi.js";

export class BoardRepository {
    async listByUserID(userID) {
        const response = await listByUserID(userID);
        return response;
    }

    async listByOwnerID(ownerID) {
        const response = await listByOwnerID(ownerID);
        return response;
    }

    async get(boardID) {
        const response = await get(boardID);
        return response;
    }

    async create(data) {
        const response = await create(data);
        return response;
    }
}