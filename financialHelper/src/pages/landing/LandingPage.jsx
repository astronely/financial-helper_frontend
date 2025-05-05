import {LandingHeader} from "@/components/layout/Header/Header.jsx";
import {ModalManager} from "@/components/features/modals/ModalManager.jsx";
import {Home} from "@/components/layout/Home/Home.jsx";
import {ForWho} from "@/components/layout/ForWho/ForWho.jsx";
import {Possibilities} from "@/components/layout/Possibilities/Possibilities.jsx";
import './informationText.scss'
import './informationBlock.scss'

export function LandingPage() {
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
            <ModalManager/>
        </>
    )
}