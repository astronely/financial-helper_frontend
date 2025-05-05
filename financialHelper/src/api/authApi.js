import axiosInstance from "@/api/httpClient/axiosInstance.js";

const authURL = '/api/v1/user'

export const login = (userInfo) =>
    axiosInstance.post(authURL + '/login', userInfo);