import axiosInstance from "@/api/httpClient/axiosInstance.js";

const authURL = '/api/v1/user'

export const login = (userInfo) =>
    axiosInstance.post(authURL + '/login', userInfo);

export const logout = () =>
    axiosInstance.post(authURL + '/logout');

export const check = (endpoint) =>
    axiosInstance.get(authURL + '/check?endpointAddress=' + endpoint);