import {createContext, useState} from "react";

export const ModalContext = createContext({
    isActive: false,
    setIsActive: null,
    modal: '',
    setModal: null,
    submitHandler: null,
    setSubmitHandler: null,
    baseInfo: null,
    setBaseInfo: null,
})

export const ModalProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false)
    const [modal, setModal] = useState('')
    const [submitHandler, setSubmitHandler] = useState(() => {})
    const [baseInfo, setBaseInfo] = useState({})

    return (
        <ModalContext.Provider value={{
            isActive, setIsActive,
            modal, setModal,
            submitHandler, setSubmitHandler,
            baseInfo, setBaseInfo,
        }}>
            {children}
        </ModalContext.Provider>
    )
}