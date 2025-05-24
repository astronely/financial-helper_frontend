import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {BoardLayout} from "@/features/boards/components/BoardLayout.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";

export function BoardsPage() {

    return (
        <>
            <AppHeader />
            <main>
                <BoardLayout />
            </main>
            <ModalManager/>
        </>
    )
}