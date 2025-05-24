import {ToastContainer} from "react-toastify";
import {createBrowserRouter, RouterProvider} from "react-router";
import {LandingPage} from "@/pages/landing/LandingPage.jsx";
import {BoardsPage} from "@/pages/boards/BoardsPage.jsx";
import {BoardPage} from "@/pages/board/BoardPage.jsx";
import {ProtectedRouter} from "@/features/protectedRouter/ProtectedRouter.jsx";
import {InviteHandler} from "@/features/inviteHandler/InviteHandler.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
      element: <ProtectedRouter />,
      children: [
          {
              path: "/boards",
              element: <BoardsPage />
          },
          {
              path: "/board/:id",
              element: <BoardPage />
          }
      ]
    },
    {
        path: "/invite/:token",
        element: <InviteHandler />
    }
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
