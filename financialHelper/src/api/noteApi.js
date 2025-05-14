import axiosInstance from "@/api/httpClient/axiosInstance.js";

const noteURL = '/api/v1/note'

export const create = data =>
    axiosInstance.post(noteURL, data);

export const get = (boardID) =>
    axiosInstance.get(noteURL + "?id=" + boardID)

export const list = data => {
    // TODO: фильтрацию поиска
}

export const complete = data =>
    axiosInstance.post(noteURL, data);

export const del = id =>
    axiosInstance.delete(noteURL + "?id=" + id);

export const update = data =>
    axiosInstance.put(noteURL, data);
