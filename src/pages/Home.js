import React, { useContext, useEffect } from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ReviewItem from '../components/ReviewItem';
import Card from 'react-bootstrap/Card';
import {dateReview, ratindReview} from '../http/reviewAPI';

const Home = observer(() => {
    const {review} = useContext(Context)
    useEffect(() => {
        dateReview().then(data => review.setLastReviews(data))
        ratindReview().then(data => review.setTopReviews(data))
    }, [])
  return (
    <Container>
    <Row>
    <Card.Body className="text-center">
        <Card.Header>Last added reviews</Card.Header>
    </Card.Body>
        {review.lastReviews.map(elem => 
            <ReviewItem key={elem.id} review={elem}/>
        )}
    </Row>
    <Row>
    <Card.Body className="text-center">
        <Card.Header>Top rated reviews</Card.Header>
    </Card.Body>
        {review.topReviews.map(elem => 
            <ReviewItem key={elem.id} review={elem}/>
        )}
    </Row>
  </Container>
  )
})

export default Home