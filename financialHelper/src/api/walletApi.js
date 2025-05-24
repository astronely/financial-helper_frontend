import axiosInstance from "@/api/httpClient/axiosInstance.js";

const walletURL = '/api/v1/wallet'

export const get = (walletID) =>
    axiosInstance.get(walletURL + '/' + walletID);

export const list = (boardID) =>
    axiosInstance.get(walletURL + 's' + '/' + boardID)

export const add = (data) =>
    axiosInstance.post(walletURL, data);

export const del = (id) =>
    axiosInstance.delete(walletURL + "/" + id);

export const update = (data) =>
    axiosInstance.put(walletURL, data);