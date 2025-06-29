import './Header.scss'
import '@/components/ui/buttons/buttons.scss'
import {Container, Nav, Navbar} from 'react-bootstrap';
import React, {useEffect} from "react";
// import {useModal} from "../../hooks/useModal.js";
import {useModal} from "@/shared/hooks/useModal.js";
import {UserService} from "@/features/users/service/userService.js";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {getJwtPayload, getTokenFromCookie} from "@/shared/utils/jwt.js";
import {toast} from "react-toastify";
import {check} from "@/api/authApi.js";

export function LandingHeader() {
    const {setIsActive, setModal, setSubmitHandler, resetModal} = useModal();
    const navigate = useNavigate();
    const {reset} = useForm()
    const service = new UserService()

    const handleLogin = async data => {
        try {
            // console.log(data)
            const response = await service.loginUser(data);
            // console.log("HandleLogin response:", response)
            setIsActive(false);
            const payload = getJwtPayload(response.refreshToken)
            localStorage.setItem("userID", payload.id)
            localStorage.setItem("username", payload.username)
            navigate("/boards")
            reset()
        } catch (error) {
            if (error.status === undefined) {
                toast.error("Ошибка доступа к серверу")
            } else if (error.status === 500) {
                toast.error("Неправильный логин или пароль")
            } else if (error.status === 401) {
                toast.error("Ошибка доступа")
            }
            console.error("Ошибка при авторизации:", error)
        }
    }

    const handleRegister = async data => {
        try {
            const response = await service.registerUser(data);
            console.log("HandleRegister response:", response)
            setIsActive(false);
            toast.success("Вы успешно зарегистрировались!")
            const openRes = await openModal("signIn")

            resetModal("signUp")
        } catch (error) {
            if (error.message.includes("All fields")) {
                toast.error("Заполните все поля!")
            } else if (error.status === undefined) {
                toast.error("Ошибка доступа к серверу")
            } else if (error.status === 409) {
                toast.error("Пользователь с такой почтой уже зарегистрирован!")
            } else if (error.status === 401) {
                toast.error("Ошибка доступа")
            } else {
                toast.error("Ошибка: " + error.message)
            }
            console.error("Ошибка при авторизации:", error)
        }
    }

    async function openModal(modalName) {
        try {
            const response = await check("/boards");
            if (response.isAllowed) {
                navigate("/boards")
            }
        } catch (error) {
            console.error("Ошибка авторизации: " + error)
            setIsActive(true)
            setModal(modalName)
            if (modalName === "signIn") {
                setSubmitHandler(() => handleLogin)
            } else if (modalName === "signUp") {
                setSubmitHandler(() => handleRegister)
            }
        }
    }

    return (
        <Navbar expand="sm" className="navbar">
            <Container>
                <img src="/icons/logo.svg" className='main-logo' alt='MainLogo'/>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='nav-link nav-text' href="#Home">Главная</Nav.Link>
                        <Nav.Link className='nav-link nav-text' href="#ForWho">Для кого</Nav.Link>
                        <Nav.Link className='nav-link nav-text' href="#Possibilities">Возможности</Nav.Link>
                    </Nav>
                    <div className="header-right">
                        <button className="primary-button btn-navigation nav-text" type="submit"
                                onClick={() => openModal("signIn")}>Войти
                        </button>
                        <button className="primary-button btn-navigation nav-text" type="submit"
                                onClick={() => openModal("signUp")}>Зарегистрироваться
                        </button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}