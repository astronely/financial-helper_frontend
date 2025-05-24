import axiosInstance from "@/api/httpClient/axiosInstance.js";

const transactionURL = '/api/v1/transaction'

export const get = (transactionID) =>
    axiosInstance.get(transactionURL + '/' + transactionID);

export const list = (boardID) =>
    axiosInstance.get(transactionURL + 's' + '/' + boardID)

export const add = (data) =>
    axiosInstance.post(transactionURL, data);

export const del = (id) =>
    axiosInstance.delete(transactionURL + "/" + id);

export const update = (data) =>
    axiosInstance.put(transactionURL, data);

export const categories = () =>
    axiosInstance.get(transactionURL + "/categories")

