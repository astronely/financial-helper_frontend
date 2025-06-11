import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {BoardLayout} from "@/features/board/components/BoardLayout.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {AddWallet} from "@/components/features/modals/wallet/AddWallet.jsx";
import {UpdateWallet} from "@/components/features/modals/wallet/UpdateWallet.jsx";
import {AddTransaction} from "@/components/features/modals/transaction/AddTransaction.jsx";
import {UpdateTransaction} from "@/components/features/modals/transaction/UpdateTransaction.jsx";
import {FilterTransaction} from "@/components/features/modals/transaction/FilterTransaction.jsx";
import {ConfirmDelete} from "@/components/features/modals/shared/Confirm.jsx";
import {Invite} from "@/components/features/modals/board/Invite.jsx";
import {useModal} from "@/shared/hooks/useModal.js";

export function BoardPage() {
    const {modal} = useModal();
    return (
        <>
            <AppHeader />
            <main>
                <BoardLayout />
            </main>
            {/*<ModalManager/>*/}
            <ConfirmDelete open={modal === 'confirm'}/>

            <AddWallet open={modal === 'addWallet'}/>
            <UpdateWallet open={modal === 'updateWallet'}/>

            <AddTransaction open={modal === 'addTransaction'}/>
            <UpdateTransaction open={modal === 'updateTransaction'}/>
            <FilterTransaction open={modal === 'filterTransaction'}/>

            <Invite open={modal === 'invite'}/>
        </>
    )
}