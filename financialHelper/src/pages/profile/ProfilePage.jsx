import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {ProfileLayout} from "@/features/profile/components/ProfileLayout.jsx";
import {UpdateUser} from "@/components/features/modals/user/UpdateUser.jsx";
import {useModal} from "@/shared/hooks/useModal.js";

export function ProfilePage() {
    const {modal} = useModal();
    return (
        <>
            <AppHeader />
            <main>
                <ProfileLayout />
            </main>
            <UpdateUser open={modal === 'updateUser'}/>
            {/*<ModalManager />*/}
        </>
    )
}