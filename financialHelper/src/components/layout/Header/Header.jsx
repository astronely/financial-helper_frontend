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

export function LandingHeader() {
    const {setIsActive, setModal, setSubmitHandler, submitHandler} = useModal();
    const navigate = useNavigate();
    const {reset} = useForm()
    const service = new UserService()


    const handleLogin = async data => {
        try {
            // console.log(data)
            const response = await service.loginUser(data);
            console.log("HandleLogin response:", response)
            setIsActive(false);
            const payload = getJwtPayload(response.refreshToken)
            localStorage.setItem("userID", payload.id)
            localStorage.setItem("username", payload.username)
            navigate("/boards")
            reset()
        } catch (error) {
            console.error("Ошибка при авторизации:", error)
        }
    }

    const handleRegister = async data => {
        try {
            const response = await service.registerUser(data);
            console.log("HandleRegister response:", response)
            setIsActive(false);
            navigate("/boards")
            reset()
        } catch (error) {
            console.error("Ошибка при авторизации:", error)
        }
    }

    async function openModal(modalName) {
        setIsActive(true)
        setModal(modalName)
        if (modalName === "signIn") {
            setSubmitHandler(() => handleLogin)
        } else if (modalName === "signUp") {
            setSubmitHandler(() => handleRegister)
        }
    }

    return (
        <Navbar expand="lg" className="navbar">
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