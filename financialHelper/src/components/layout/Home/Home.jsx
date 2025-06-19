import {Col, Container, Row} from "react-bootstrap";
import './blocks.scss'
import './text.scss'
import './buttons.scss'
import {useModal} from "@/shared/hooks/useModal.js";
import {openModal} from "@/shared/utils/modalUtils.js";
import {toast} from "react-toastify";
import {UserService} from "@/features/users/service/userService.js";

export function Home() {
    const  {setIsActive, setModal, setSubmitHandler, resetModal} = useModal();
    const service = new UserService();

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
            }
            console.error("Ошибка при авторизации:", error)
        }
    }

    async function openModal(modalName) {
        setIsActive(true)
        setModal(modalName)
        if (modalName === "signUp") {
            setSubmitHandler(() => handleRegister)
        }
    }

    return (
        <Container>
            <div className="base-info">
                <Row className="base-position gx-4 gy-3">
                    <Col md="6" sm="12" className="base-text-block">
                        <div className="main-title-block">
                            <span className="header-text">Лучшая инвестиция – это инвестиция в себя через накопления</span>
                            <span className="subtitle-text">Учет доходов и финансов, помощь в накоплении средств и достижении финансовых целей</span>
                        </div>
                        <button className="btn-action" onClick={() => openModal(setIsActive, setModal, "signUp")}>Начать пользоваться</button>
                    </Col>
                    <Col md="6" sm="12" className="picture-block">
                        <img className="col-12 picture" src="/pictures/title-picture.png"/>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}