import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axiosInstance from "@/api/httpClient/axiosInstance.js";
import {join} from "@/api/boardApi.js";

export function InviteHandler() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            console.log(params.token)
            join(params.token);
            navigate('/boards');
        } catch (err) {
            console.error("Ошибка подключения к доске: " + err)
        }
    }, [params.token]);
}