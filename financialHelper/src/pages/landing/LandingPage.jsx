import {LandingHeader} from "@/components/layout/Header/Header.jsx";
import {Home} from "@/components/layout/Home/Home.jsx";
import {ForWho} from "@/components/layout/ForWho/ForWho.jsx";
import {Possibilities} from "@/components/layout/Possibilities/Possibilities.jsx";
import './informationText.scss'
import './informationBlock.scss'
import {SignIn} from "@/components/features/modals/auth/SignIn.jsx";
import {SignUp} from "@/components/features/modals/auth/SignUp.jsx";
import {useModal} from "@/shared/hooks/useModal.js";

export function LandingPage() {
    const {modal} = useModal()
    return (
        <>
            <LandingHeader />
            <main>
                <div className='wrap' style={{paddingTop: 50}}>
                    <div id="Home" className="bg-odd">
                        <Home/>
                    </div>
                    <div id="ForWho" className="bg-even">
                        <ForWho/>
                    </div>
                    <div id="Possibilities" className="bg-odd">
                        <Possibilities/>
                    </div>
                    {/*<div id="Statistics" className="bg-even">*/}
                    {/*    <Statistics />*/}
                    {/*</div>*/}
                </div>
            </main>
            <SignIn open={modal === 'signIn'}/>
            <SignUp open={modal === 'signUp'}/>
        </>
    )
}