import {Col, Container, Row} from "react-bootstrap";
import {CardSmall} from "@/components/layout/CardSmall/CardSmall.jsx";

export function Possibilities() {
    return (
        <Container>
            <div className="block-vertical">
                <div className="title-text">Возможности</div>
                <Row className="card-position gx-4 gy-3">
                    <Col md={3} xs={12}>
                        <CardSmall title="Учет доходов"
                                   subtitle="Позволяет вести учет финансов, создавая кошельки с удобными названиями."/>
                    </Col>
                    <Col md={3} xs={12}>
                        <CardSmall title='Учет расходов'
                                   subtitle="Позволяет вести учет совершенных финансовых операций, с указанием места,
                                    в котором была проведена операция, категории расходов и даты совершения операции."/>
                    </Col>
                    <Col md={3} xs={12}>
                        <CardSmall title='Несколько рабочих зон'
                                   subtitle="Позволяет создавать доски. В них можно вести учет финансов в них независимо
                                   и приглашать в них других пользователей."/>
                    </Col>
                    <Col md={3} xs={12}>
                        <CardSmall title='Заметки'
                                   subtitle="Позволяет создавать заметки в доске и отмечать их как выполненные."/>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}