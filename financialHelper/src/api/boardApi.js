import axiosInstance from "@/api/httpClient/axiosInstance.js";

const boardURL = `/api/v1/board`
const boardListURL = `/api/v1/user/boards`

export const get = boardID =>
    axiosInstance.get(boardURL + '?id=' + boardID);

// export const listByOwnerID = ownerID =>
//     axiosInstance.get(boardURL + '/listByOwnerId' + '?ownerId=' + ownerID);

export const listByUserID = () =>
    axiosInstance.get(boardListURL);

export const create = data =>
    axiosInstance.post(boardURL, data);

export const setBoard = data =>
    axiosInstance.get(boardURL + '/set?boardId=' + data)