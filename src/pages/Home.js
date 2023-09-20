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
import { useTranslation } from 'react-i18next';

const Home = observer(() => {
    const { t, i18n } = useTranslation();
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
    <Row className='mt-3 mb-4'>
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
    <Col md={7} className='d-flex justify-content-center'>
        <TagCloud
            className='m-auto'
            style={{cursor: 'pointer'}}
            minSize={12}
            maxSize={35}
            tags={tag.tags}
            onClick={pick => getReviewTags(pick.value).then(data => tag.setSerchedReviews(data))}
        />
    </Col>
    <Col className='d-flex justify-content-center'>
        <Button 
            onClick={() => tag.setSerchedReviews([])}
            style={{fontWeight: 'bold', fontSize: '1.2rem'}}
            >{t("home.search")}</Button>
    </Col>
    </Row>
    <Row>
    {tag.serchedReviews.map(elem => 
        <ReviewItem key={elem._id} review={elem}/>
    )}
    </Row>
    <Row>
    <Card.Body className="text-center">
        <Card.Title className='mb-2'>{t("home.last")}</Card.Title>
    </Card.Body>
        {review.lastReviews.map(elem => 
            <ReviewItem key={elem._id} review={elem}/>
        )}
    </Row>
    <Row>
    <Card.Body className="text-center">
        <Card.Title className='mb-2 mt-2'>{t("home.top")}</Card.Title>
    </Card.Body>
        {review.topReviews.map(elem => 
            <ReviewItem key={elem._id} review={elem}/>
        )}
    </Row>
  </Container>
  )
})

export default Home