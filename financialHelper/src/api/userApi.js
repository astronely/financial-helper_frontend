import axiosInstance from "@/api/httpClient/axiosInstance.js";

const userURL = `/api/v1/user`

export const create = (userInfo) =>
    axiosInstance.post(userURL + '/create', userInfo);

export const get = (userID) =>
    axiosInstance.get(userURL + '/' + userID);

export const update = data =>
    axiosInstance.put(userURL, data)