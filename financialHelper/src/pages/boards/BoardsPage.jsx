import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {BoardLayout} from "@/features/boards/components/BoardLayout.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {AddBoard} from "@/components/features/modals/board/AddBoard.jsx";
import {UpdateBoard} from "@/components/features/modals/board/UpdateBoard.jsx";
import {ConfirmDelete} from "@/components/features/modals/shared/Confirm.jsx";
import {useModal} from "@/shared/hooks/useModal.js";

export function BoardsPage() {
    const {modal} = useModal()
    return (
        <>
            <AppHeader />
            <main>
                <BoardLayout />
            </main>
            {/*<ModalManager/>*/}
            <AddBoard open={modal === 'addBoard'}/>
            <UpdateBoard open={modal === 'updateBoard'}/>
            <ConfirmDelete open={modal === 'confirm'}/>
        </>
    )
}