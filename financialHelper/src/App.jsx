import {ToastContainer} from "react-toastify";
import {createBrowserRouter, RouterProvider} from "react-router";
import {Landing} from "@/components/pages/Landing/Landing.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
    },
]);

export default function App() {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false}
                            closeOnClick
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover={false}
                            theme="colored"
            />
        </>
    )
}
