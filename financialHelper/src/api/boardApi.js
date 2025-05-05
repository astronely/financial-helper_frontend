import axiosInstance from "@/api/httpClient/axiosInstance.js";

const boardURL = `/api/v1/board`

export const get = boardID =>
    axiosInstance.get(boardURL + '/get' + '?id=' + boardID);

export const listByOwnerID = ownerID =>
    axiosInstance.get(boardURL + '/listByOwnerId' + '?ownerId=' + ownerID);

export const listByUserID = userID =>
    axiosInstance.get(boardURL + '/listByUserId' + '?id=' + userID);

export const create = data =>
    axiosInstance.post(boardURL + '/create', data);

