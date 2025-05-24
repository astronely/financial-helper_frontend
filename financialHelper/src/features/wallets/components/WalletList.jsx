import {Wallet} from "@/features/wallets/components/Wallet.jsx";

export function WalletList({wallets, openModal}) {
    // <Wallet wallet={wallet} confirmDelete={openConfirm} setWalletToDelete={setWalletToDelete}
    //             key={index}/>

    return (
        <div className='wallets'>
            <div className={'wallets__title'}>Кошельки</div>
            <div className='wallets__cards'>
                {wallets.map((wallet, index) => (
                    <Wallet wallet={wallet} openModal={openModal} key={index}/>
                ))}
            </div>
        </div>
    )
}