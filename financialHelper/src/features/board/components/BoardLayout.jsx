import {WalletsLayout} from "@/features/wallets/components/WalletsLayout.jsx";
import {TransactionsLayout} from "@/features/transactions/components/TransactionsLayout.jsx";
import "./Board.scss"

export function BoardLayout() {
    return (
        <div className="board__container opacity_animation">
            <WalletsLayout />
            <TransactionsLayout />
        </div>
    )
}