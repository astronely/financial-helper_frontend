import {Wallet} from "@/features/wallets/components/Wallet.jsx";
import {openConfirm} from "@/shared/utils/modalUtils.js";

export function WalletList({wallets}) {
    // <Wallet wallet={wallet} confirmDelete={openConfirm} setWalletToDelete={setWalletToDelete}
    //             key={index}/>
    return (
        <div className={'wallets'}>
            <div className={'wallets__title'}>Кошельки</div>
            <div className={'wallets__cards'}>
                {wallets.map((wallet, index) => (
                    <Wallet wallet={wallet} key={index}/>
                ))}
            </div>
        </div>
    )
}