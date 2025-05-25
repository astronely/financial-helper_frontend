import axiosInstance from "@/api/httpClient/axiosInstance.js";

const boardURL = `/api/v1/board`
const boardListURL = `/api/v1/boards`

export const get = boardID =>
    axiosInstance.get(boardURL + '/' + boardID);

// export const listByOwnerID = ownerID =>
//     axiosInstance.get(boardURL + '/listByOwnerId' + '?ownerId=' + ownerID);

export const listByUserID = () =>
    axiosInstance.get(boardListURL);

export const create = data =>
    axiosInstance.post(boardURL, data);

export const setBoard = data =>
    axiosInstance.get(boardURL + '/set/' + data)

export const update = data =>
    axiosInstance.put(boardURL, data);

export const invite = data =>
    axiosInstance.get(boardURL + '/generateInviteToken');

export const join = token =>
    axiosInstance.get(boardURL + '/join/' + token)

export const getUsers = boardID =>
    axiosInstance.get(boardURL + '/users/' + boardID);

export const del = boardID =>
    axiosInstance.delete(boardURL + '/' + boardID)

export const deleteUser = userID =>
    axiosInstance.delete(boardURL + '/delete/user/' + userID)