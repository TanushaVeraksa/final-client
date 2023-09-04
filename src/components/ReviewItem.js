import React from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import {useNavigate} from 'react-router-dom';
import {REVIEW_ROUTE} from '../utils/consts'

function ReviewItem({review}) {
    const navigation = useNavigate ();
    return (
        <Col md={3} onClick={() => navigation(REVIEW_ROUTE + '/' + review._id)}>
            <Card className='m-auto' style={{cursor: 'pointer', width:150}} border={'light'}>
                <Image width={150} height={200} src={review.img} rounded />
                <div>
                    <div>{review.title} rating: {review.rating}</div>
                    <div>tag: {review.tag}</div>
                </div>
            </Card>
        </Col>
    )
}

export default ReviewItem