import {useEffect, useState} from "react";
import {Navigate, Outlet, useLocation} from "react-router";
import {check} from "@/api/authApi.js"

export function ProtectedRouter() {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const url = useLocation().pathname
    // console.log(url)
    useEffect(() => {
        const verify = async () => {
            try {
                await check(url);
                setIsAuthorized(true);
            } catch (error) {
                console.error("Ошибка авторизации: " + error)
                setIsAuthorized(false);
            }
        };

        verify();
    }, []);

    if (isAuthorized === null) {
        return null
    }

    return isAuthorized ? <Outlet /> : <Navigate to="/" replace />
}