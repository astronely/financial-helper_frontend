import axiosInstance from "@/api/httpClient/axiosInstance.js";

const walletURL = '/api/v1/wallet'

export const get = (walletID) =>
    axiosInstance.get(walletURL + '/create' + '?id=' + walletID);

export const list = (boardID) =>
    axiosInstance.get(walletURL + '/list' + '?boardID=' + boardID)
