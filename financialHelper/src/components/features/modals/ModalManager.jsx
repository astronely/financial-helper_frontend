import {SignIn} from "./auth/SignIn.jsx";
import {SignUp} from "./auth/SignUp.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {AddWallet} from "@/components/features/modals/wallet/AddWallet.jsx";
import {UpdateWallet} from "@/components/features/modals/wallet/UpdateWallet.jsx";
import {ConfirmDelete} from "@/components/features/modals/shared/Confirm.jsx";
import {Invite} from "@/components/features/modals/board/Invite.jsx";
import {AddBoard} from "@/components/features/modals/board/AddBoard.jsx";
import {AddTransaction} from "@/components/features/modals/transaction/AddTransaction.jsx";
import {FilterTransaction} from "@/components/features/modals/transaction/FilterTransaction.jsx";
import {UpdateTransaction} from "@/components/features/modals/transaction/UpdateTransaction.jsx";
import {AddNote} from "@/components/features/modals/note/AddNote.jsx";
import {UpdateNote} from "@/components/features/modals/note/UpdateNote.jsx";
import {UpdateBoard} from "@/components/features/modals/board/UpdateBoard.jsx";

export function ModalManager() {
    const {modal} = useModal();
    return (
        <>
            <SignIn open={modal === 'signIn'}/>
            <SignUp open={modal === 'signUp'}/>
            <ConfirmDelete open={modal === 'confirm'}/>

            <AddWallet open={modal === 'addWallet'}/>
            <UpdateWallet open={modal === 'updateWallet'}/>

            <Invite open={modal === 'invite'}/>
            <AddBoard open={modal === 'addBoard'}/>
            <UpdateBoard open={modal === 'updateBoard'}/>

            <AddTransaction open={modal === 'addTransaction'}/>
            <UpdateTransaction open={modal === 'updateTransaction'}/>
            <FilterTransaction open={modal === 'filterTransaction'}/>

            <AddNote open={modal === 'addNote'}/>
            <UpdateNote open={modal === 'updateNote'}/>
        </>
    )
}