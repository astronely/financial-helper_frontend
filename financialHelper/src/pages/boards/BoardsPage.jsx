import {AppHeader} from "@/components/layout/AppHeader/AppHeader.jsx";
import {BoardLayout} from "@/features/boards/components/BoardLayout.jsx";

export function BoardsPage() {

    return (
        <>
            <AppHeader />
            <main>
                <BoardLayout />
            </main>
        </>
    )
}