import {useEffect, useState} from "react";
import {BoardService} from "@/features/boards/service/boardService.js";

export const useWallet = (userID) => {
    const [boards, setBoards] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const service = new BoardService();
        service.listByUserId(userID)
            .then(setBoards)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [userID]);

    return { boards, loading, error }
}