import {createContext, useState} from "react";

export const ModalContext = createContext({
    isActive: false,
    setIsActive: null,
    modal: '',
    setModal: null,
    submitHandler: null,
    setSubmitHandler: null,
})

export const ModalProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false)
    const [modal, setModal] = useState('')
    const [submitHandler, setSubmitHandler] = useState(() => {})

    return (
        <ModalContext.Provider value={{
            isActive, setIsActive,
            modal, setModal,
            submitHandler, setSubmitHandler,
        }}>
            {children}
        </ModalContext.Provider>
    )
}