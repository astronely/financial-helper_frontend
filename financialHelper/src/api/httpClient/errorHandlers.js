export const handleError = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                console.error("Unauthorized");
                // window.location.href = '/login';
                break;
            case 500:
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