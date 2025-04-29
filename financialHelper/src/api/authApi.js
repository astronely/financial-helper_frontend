import axiosInstance from "@/api/httpClient/axiosInstance.js";

export const login = (userInfo) => {
    console.log(userInfo)
    return axiosInstance.post("/api/v1/user/login", userInfo)
};