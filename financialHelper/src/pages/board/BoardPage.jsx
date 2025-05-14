import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {BoardLayout} from "@/features/board/components/BoardLayout.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";

export function BoardPage() {
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