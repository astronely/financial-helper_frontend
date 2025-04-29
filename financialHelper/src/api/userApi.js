import axiosInstance from "@/api/httpClient/axiosInstance.js";

export const create = (userInfo) => {
    return axiosInstance.post('/v1/api/user/create', userInfo);
};

export const get = (userId) => {
    return axiosInstance.get('/v1/api/user?id=' + userId);
}