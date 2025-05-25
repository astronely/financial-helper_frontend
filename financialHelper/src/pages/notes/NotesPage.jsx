import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {NoteLayout} from "@/features/notes/components/NoteLayout.jsx";

export function NotesPage() {
    return (
        <>
            <AppHeader />
            <main>
                <NoteLayout />
            </main>
            <ModalManager />
        </>
    )
}