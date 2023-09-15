import React, { useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReviewItem from '../components/ReviewItem';
import Card from 'react-bootstrap/Card';
import {dateReview, ratindReview, getTags, getReviewTags, searchReview} from '../http/reviewAPI';
import { TagCloud } from 'react-tagcloud';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from '@mui/icons-material/Search';

const Home = observer(() => {
    const {review} = useContext(Context)
    const {tag} = useContext(Context)
    const [value, setValue] = useState();
    useEffect(() => {
        dateReview().then(data => review.setLastReviews(data))
        ratindReview().then(data => review.setTopReviews(data))
        getTags().then(data => tag.setTags(data))
    }, [])
    const search = () => {
        searchReview(value).then(data => tag.setSerchedReviews(data))
    }
  return (
    <Container>
    <Row className='mt-3'>
    <Col md={3}>
    <InputGroup>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={e => setValue(e.target.value)}
        />
        <InputGroup.Text>
            <Button onClick={search} variant="outline-secondary"><SearchIcon/></Button>
        </InputGroup.Text>
      </InputGroup>
    </Col>
    <Col md={6}>
        <TagCloud
            className='m-auto'
            style={{cursor: 'pointer'}}
            minSize={12}
            maxSize={35}
            tags={tag.tags}
            onClick={pick => getReviewTags(pick.value).then(data => tag.setSerchedReviews(data))}
        />
    </Col>
    <Col>
        <Button onClick={() => tag.setSerchedReviews([])}>Reset tags</Button>
    </Col>
    </Row>
    <Row>
    {tag.serchedReviews.map(elem => 
        <ReviewItem key={elem._id} review={elem}/>
    )}
    </Row>
    <Row>
    <Card.Body className="text-center">
        <Card.Header>Last added reviews</Card.Header>
    </Card.Body>
        {review.lastReviews.map(elem => 
            <ReviewItem key={elem._id} review={elem}/>
        )}
    </Row>
    <Row>
    <Card.Body className="text-center">
        <Card.Header>Top rated reviews</Card.Header>
    </Card.Body>
        {review.topReviews.map(elem => 
            <ReviewItem key={elem._id} review={elem}/>
        )}
    </Row>
  </Container>
  )
})

export default Home