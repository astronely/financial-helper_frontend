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
    updateItems: false,
    setUpdateItems: null,
    resetFunctions: {},
    setResetFunctions: null,
    registerReset: null,
    resetModal: null,
})

export const ModalProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false)
    const [modal, setModal] = useState('')
    const [submitHandler, setSubmitHandler] = useState(() => {})
    const [baseInfo, setBaseInfo] = useState({})
    const [updateItems, setUpdateItems] = useState(false)
    const [resetFunctions, setResetFunctions] = useState({})

    const registerReset = (modalName, resetFn) => {
        setResetFunctions(prev => ({
            ...prev,
            [modalName]: resetFn
        }));
    };

    const resetModal = (modalName) => {
        if (resetFunctions[modalName]) {
            resetFunctions[modalName]()
        }
    };

    return (
        <ModalContext.Provider value={{
            isActive, setIsActive,
            modal, setModal,
            submitHandler, setSubmitHandler,
            baseInfo, setBaseInfo,
            updateItems, setUpdateItems,
            registerReset, resetModal,
        }}>
            {children}
        </ModalContext.Provider>
    )
}