import React from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import {useNavigate} from 'react-router-dom';
import {REVIEW_ROUTE} from '../utils/consts';
import Rating from '@mui/material/Rating';
import '../style/style.css'
import { useTranslation } from 'react-i18next';

function ReviewItem({review}) {
    const { t, i18n } = useTranslation();
    const navigation = useNavigate();
    return (
        <Col md={3} onClick={() => navigation(REVIEW_ROUTE + '/' + review._id)}>
            <Card className='m-auto p-2 app_card' style={{cursor: 'pointer'}}>
                <div className='scale' style={{ display: 'inline-block', overflow: 'hidden'}}>
                    <Card.Img 
                        className='rounded img' 
                        height={350} 
                        variant="top" 
                        src={review.img}
                        style={{transition: '1s', display: 'block'}}
                    />
                </div>
                <div>
                    <Card.Header className='m-auto'>{review.title}</Card.Header>
                    <Card.Text className='d-flex align-items-center'>
                        <span>{t("review.rating")}:</span> 
                        <Rating name="read-only" value={review.rating} precision={0.5} readOnly />
                        {review.rating}
                    </Card.Text>  
                </div>
                <div>
                {t("review.tag")}: {review.tag.map((tag, index) => 
                    <div className='bg-primary text-light me-2 rounded p-1'
                            style={{display: 'inline-block'}} 
                            key ={index}>
                            {tag}
                    </div>
                    )}
                </div>
            </Card>
        </Col>
    )
}

export default ReviewItem