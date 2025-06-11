import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {BoardUsersLayout} from "@/features/users/components/BoardUsersLayout.jsx";
import {ConfirmDelete} from "@/components/features/modals/shared/Confirm.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {Invite} from "@/components/features/modals/board/Invite.jsx";

export function BoardUsersPage() {
    const {modal} = useModal();
    return (
        <>
            <AppHeader />
            <main>
                <BoardUsersLayout />
            </main>
            <ConfirmDelete open={modal === 'confirm'}/>

            <Invite open={modal === 'invite'}/>
            {/*<ModalManager />*/}
        </>
    )
}