import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {ProfileLayout} from "@/features/profile/components/ProfileLayout.jsx";

export function ProfilePage() {

    return (
        <>
            <AppHeader />
            <main>
                <ProfileLayout />
            </main>
            <ModalManager />
        </>
    )
}