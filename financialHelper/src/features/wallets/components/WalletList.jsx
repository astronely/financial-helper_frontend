import {Wallet} from "@/features/wallets/components/Wallet.jsx";

export function WalletList({wallets, openModal}) {
    return (
        <div className='wallets'>
            <div className={'wallets__title'}>Кошельки</div>
            <div className='wallets__cards'>
                {wallets.map((wallet) => (
                    <Wallet wallet={wallet} openModal={openModal} key={wallet.id}/>
                ))}
            </div>
        </div>
    )
}