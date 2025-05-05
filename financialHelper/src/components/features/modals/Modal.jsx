import './Modal.scss'
import {useModal} from "@/shared/hooks/useModal.js";

export function Modal({children, open}) {
    const  {isActive, setIsActive} = useModal();

    return (
        <div className={isActive && open ? 'modal active' : 'modal'} onClick={() => setIsActive(false)}>
            <div className={isActive && open ? 'modal-content active' : 'modal-content'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}