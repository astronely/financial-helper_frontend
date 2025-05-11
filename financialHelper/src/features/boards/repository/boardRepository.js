import {listByUserID, get, create, setBoard} from "@/api/boardApi.js";

export class BoardRepository {
    async listByUserID() {
        const response = await listByUserID();
        return response;
    }

    // async listByOwnerID(ownerID) {
    //     const response = await listByOwnerID(ownerID);
    //     return response;
    // }

    async get(boardID) {
        const response = await get(boardID);
        return response;
    }

    async create(data) {
        const response = await create(data);
        return response;
    }

    async set(data) {
        const response = await setBoard(data);
        return response;
    }
}