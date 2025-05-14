import './Header.scss'
import {Container, Nav, Navbar} from 'react-bootstrap';
import React from "react";
import {useLoaderData, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {UserService} from "@/features/users/service/userService.js";


export function AppHeader() {
    // const  {setIsActive, setModal} = useModal();
    // const usernameFromLoader = useLoaderData()
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const service = new UserService()

    const logout = async () => {
        try {
            const response = await service.logout()
            navigate('/')
            toast.success("Вы успешно вышли из своей учетной записи")
        } catch (error) {
            console.error("Ошибка выхода из профиля: " + error)
        }
        // await axios.get('http://localhost:8080/api/signout', {withCredentials: true})
        //     .then(response => {
        //         // console.log(response)
        //         if (response.status === 200) {
        //             // console.log(response.data)
        //             navigate("/", {replace: true})
        //         }
        //     })
        //     .catch(error => console.log(error))
    }

    return (
        <Navbar expand="lg" className="navbar">
            <Container>
                <img src="/icons/logo.svg" className='main-logo' alt='MainLogo' />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className='nav-link nav-text active' href="#" onClick={() => navigate("/")}>Главная</Nav.Link>
                        {/*// TODO: записки*/}
                        <Nav.Link className='nav-link nav-text active' href="#" onClick={() => navigate("/notes/:id")}>Заметки</Nav.Link>
                        {/*<Nav.Link className='nav-link nav-text' href="#">Добавить</Nav.Link>*/}
                        {/*<Nav.Link className='nav-link nav-text' href="#">Просмотреть расходы</Nav.Link>*/}
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