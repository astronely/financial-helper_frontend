import {toast} from "react-toastify";

export const handleError = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                console.error("Unauthorized");
                toast.error("Ошибка доступа");
                // window.location.href = '/login';
                break;
            case 500:
                toast.error("Ошибка доступа к серверу");
                console.error("Server error:", error.message);
                break;
            default:
                console.error("Error:", error.message);
        }
    } else {
        console.error("Network error:", error.message)
    }

    return Promise.reject(error)
}