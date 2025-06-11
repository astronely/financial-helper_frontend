import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {NoteLayout} from "@/features/notes/components/NoteLayout.jsx";
import {AddNote} from "@/components/features/modals/note/AddNote.jsx";
import {UpdateNote} from "@/components/features/modals/note/UpdateNote.jsx";
import {FilterNote} from "@/components/features/modals/note/FilterNote.jsx";
import {ConfirmDelete} from "@/components/features/modals/shared/Confirm.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {Invite} from "@/components/features/modals/board/Invite.jsx";

export function NotesPage() {
    const {modal} = useModal();
    return (
        <>
            <AppHeader />
            <main>
                <NoteLayout />
            </main>
            {/*<ModalManager />*/}
            <ConfirmDelete open={modal === 'confirm'}/>

            <AddNote open={modal === 'addNote'}/>
            <UpdateNote open={modal === 'updateNote'}/>
            <FilterNote open={modal === 'filterNote'}/>

            <Invite open={modal === 'invite'}/>
        </>
    )
}