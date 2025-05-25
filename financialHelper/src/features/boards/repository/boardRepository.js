import {listByUserID, get, create, setBoard, invite, update, del, deleteUser, getUsers} from "@/api/boardApi.js";
import {data} from "react-router";

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

    async invite() {
        const response = await invite();
        return response;
    }

    async update(data) {
        const response = await update(data);
        return response;
    }

    async delete(id) {
        const response = await del(id);
        return response;
    }

    async boardUsers(boardID) {
        const response = await getUsers(boardID);
        return response;
    }

    async deleteUser(userID) {
        const response = await deleteUser(userID);
        return response;
    }
}