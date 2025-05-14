import {SignIn} from "./auth/SignIn.jsx";
import {SignUp} from "./auth/SignUp.jsx";
import {useModal} from "@/shared/hooks/useModal.js";
import {AddWallet} from "@/components/features/modals/wallet/AddWallet.jsx";
import {UpdateWallet} from "@/components/features/modals/wallet/UpdateWallet.jsx";

export function ModalManager() {
    const {modal} = useModal();
    return (
        <>
            <SignIn open={modal === 'signIn'} />
            <SignUp open={modal === 'signUp'} />
            <AddWallet open={modal === 'addWallet'} />
            <UpdateWallet open={modal === 'updateWallet'} />
        </>
    )
}