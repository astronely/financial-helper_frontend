import {Wallet} from "@/features/wallets/components/Wallet.jsx";
import {openConfirm} from "@/shared/utils/modalUtils.js";

export function WalletList({wallets}) {
    return (
        <div className={'wallets'}>
            <div className={'wallets__title'}>Кошельки</div>
            <div className={'wallets__cards'}>
                {wallets.map((wallet, index) => (
                    <Wallet wallet={wallet} confirmDelete={openConfirm} setWalletToDelete={setWalletToDelete}
                            key={index}/>
                ))}
            </div>
        </div>
    )
}