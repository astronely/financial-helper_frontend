import axiosInstance from "@/api/httpClient/axiosInstance.js";

const noteURL = '/api/v1/note'

export const create = data =>
    axiosInstance.post(noteURL, data);

export const get = (noteID) =>
    axiosInstance.get(noteURL + "/" + noteID)

export const list = (boardID) =>
    axiosInstance.get(noteURL + "s/" + boardID)

export const listFilter = (boardID, queryParams) =>
    axiosInstance.get(noteURL + "s/" + boardID + queryParams)

export const complete = data =>
    axiosInstance.post(noteURL + "/complete", data);

export const del = id =>
    axiosInstance.delete(noteURL + "/" + id);

export const update = data =>
    axiosInstance.put(noteURL, data);
