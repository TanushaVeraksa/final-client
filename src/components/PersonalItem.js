import React, { useContext} from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';

const ReviewItem = observer(() => {
    const {review} = useContext(Context);
    return (
        <Row>
        {review.personalReview.map((elem) => 
        <Col md={4}>
            <Card
                bg={elem._id === review.selectedReview._id ? 'warning' : 'secondary'}
                text='light'
                className='d-flex flex-row p-2 mt-2 align-items-center'
                style={{cursor: 'pointer'}}
                onClick={() => review.setSelectedReview(elem)}
            >
                <Image width={100} height={100} src={elem.img} rounded />
                <div className='m-auto'>
                    <Card.Header>{elem.title}</Card.Header>
                    <Card.Text className='mb-0'>Group: {elem.group} Grade: {elem.grade}</Card.Text>
                    <Card.Text className='mb-0'>Author's grade: {elem.grade}</Card.Text>
                    <Card.Text>Date: {elem.dateCreation && elem.dateCreation.slice(0, 10)}</Card.Text>
                </div>
            </Card>
        </Col>
        )}
        </Row>
    )
})

export default ReviewItem