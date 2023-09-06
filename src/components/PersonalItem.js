import React, { useContext} from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';

const ReviewItem = observer(({personal}) => {
    const {review} = useContext(Context);
    return (
        <Row>
        {review.personalReview.map((elem) => 
        <Col md={3}>
            <Card
            bg={elem._id === review.selectedReview._id ? 'warning' : 'secondary'}
            text='light'
            className='d-flex flex-row p-2 mt-2'
            style={{cursor: 'pointer'}}
            onClick={() => review.setSelectedReview(elem)}
            >
                <Image width={100} height={100} src={elem.img} rounded />
                <div>
                    <div>{elem.title}</div>
                    <div>tag: {elem.tag}</div>
                    <div>date: {elem.dateCreation}</div>
                </div>
            </Card>
        </Col>
        )}
        </Row>
    )
})

export default ReviewItem