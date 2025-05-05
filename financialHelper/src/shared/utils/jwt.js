import {jwtDecode} from "jwt-decode";

export function getTokenFromCookie(name) {
    const match = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`));
    return match ? match.split('=')[1] : null
}

export function getJwtPayload(token) {
    console.log(token)
    if (!token) return null
    try {
        return jwtDecode(token);
    } catch {
        return null
    }
}