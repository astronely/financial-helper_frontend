import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {BoardUsersLayout} from "@/features/users/components/BoardUsersLayout.jsx";

export function BoardUsersPage() {

    return (
        <>
            <AppHeader />
            <main>
                <BoardUsersLayout />
            </main>
            <ModalManager />
        </>
    )
}