import axiosInstance from "@/api/httpClient/axiosInstance.js";

const transactionURL = '/api/v1/transaction'

export const get = (transactionID) =>
    axiosInstance.get(transactionURL + '?id=' + transactionID);

export const list = (boardID) =>
    axiosInstance.get(transactionURL + 's' + '?boardId=' + boardID)

export const add = (data) =>
    axiosInstance.post(transactionURL, data);

export const del = (id) =>
    axiosInstance.delete(transactionURL + "?id=" + id);

export const update = (data) =>
    axiosInstance.put(transactionURL, data);

