import {WalletsLayout} from "@/features/wallets/components/WalletsLayout.jsx";
import {TransactionsLayout} from "@/features/transactions/components/TransactionsLayout.jsx";
import {Container} from "react-bootstrap"
import "./Board.scss"

export function BoardLayout() {
    return (
        <Container className="board__container opacity_animation">
            <WalletsLayout />
            <TransactionsLayout />
        </Container>
    )
}