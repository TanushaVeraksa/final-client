import React from 'react'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

function ReviewItem({review}) {
  return (
    <Col md={3}>
        <Card className='m-auto' style={{cursor: 'pointer', width:150}} border={'light'}>
            <Image width={150} height={150} src={review.img}/>
            <div>
                <div>{review.name}</div>
                <div>Some text...</div>
            </div>
        </Card>
    </Col>
  )
}

export default ReviewItem