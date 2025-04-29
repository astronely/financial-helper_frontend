import {SignIn} from "./auth/SignIn.jsx";
import {SignUp} from "./auth/SignUp.jsx";
import {useModal} from "../shared/hooks/useModal.js";

export function ModalManager() {
    const {modal} = useModal();
    return (
        <>
            <SignIn open={modal === 'signIn'} />
            <SignUp open={modal === 'signUp'} />
        </>
    )
}