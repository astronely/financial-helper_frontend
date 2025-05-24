import './Header.scss'
import {Container, Nav, Navbar} from 'react-bootstrap';
import React, {useState} from "react";
import {useLoaderData, useMatch, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {UserService} from "@/features/users/service/userService.js";
import {BoardService} from "@/features/boards/service/boardService.js";
import {useModal} from "@/shared/hooks/useModal.js";
import {useLocation} from "react-router";
import axiosInstance from "@/api/httpClient/axiosInstance.js";


export function AppHeader() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const match = useMatch('/board/:id')

    const  {setIsActive, setModal, setBaseInfo} = useModal();
    // const usernameFromLoader = useLoaderData()
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const userService = new UserService()
    const boardService = new BoardService();

    const logout = async () => {
        try {
            const response = await userService.logout()
            navigate('/')
            toast.success("Вы успешно вышли из своей учетной записи")
        } catch (error) {
            console.error("Ошибка выхода из профиля: " + error)
        }
    }

    function openModal(modalName) {
        setIsActive(true)
        setModal(modalName)

        if (modalName === 'invite') {
            boardService.invite()
                .then(res => {
                    console.log(res.url)
                    setBaseInfo({inviteUrl: BASE_URL + "/invite/" + res.url})
                })
                .catch(err => console.error("Ошибка получения ссылки приглашения: " + err))
        }

    }

    return (
        <Navbar expand="lg" className="navbar">
            <Container>
                <img src="/icons/logo.svg" className='main-logo' alt='MainLogo' />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='nav-link navbar-link nav-text' href="#" onClick={() => navigate("/")}>Главная</Nav.Link>
                        {/*// TODO: записки*/}
                        {match ?
                            <>
                                <Nav.Link className='nav-link navbar-link nav-text' href="#" onClick={() => navigate("/notes/:id")}>Заметки</Nav.Link>
                                <Nav.Link className='nav-link navbar-link nav-text' href="#" onClick={() => openModal('invite')}>Пригласить</Nav.Link>
                            </>
                        :
                            <></>
                        }
                    </Nav>
                    <div className="header-right">
                        <div className="nav-text">{username}!</div>
                        <button className="primary-button btn-navigation nav-text" type="submit"
                                onClick={() => logout()}>Выйти
                        </button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}