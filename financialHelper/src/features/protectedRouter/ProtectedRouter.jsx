import {useEffect, useState} from "react";
import {Navigate, Outlet, useLocation} from "react-router";
import {check} from "@/api/authApi.js"

export function ProtectedRouter() {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const url = useLocation().pathname
    // console.log("In protected router")
    useEffect(() => {
        const verify = async () => {
            try {
                const response = await check(url);
                // console.log(response)
                if (response.isAllowed) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
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