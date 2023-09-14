import React, { useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ReviewItem from '../components/ReviewItem';
import Card from 'react-bootstrap/Card';
import {dateReview, ratindReview, getTags} from '../http/reviewAPI';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Home = observer(() => {
    const {review} = useContext(Context)
    const {tag} = useContext(Context)
    const [selectedTags, setSelectedTags] = useState([])
    useEffect(() => {
        dateReview().then(data => review.setLastReviews(data))
        ratindReview().then(data => review.setTopReviews(data))
        getTags().then(data => tag.setTags(data))
    }, [])
  return (
    <Container>
    <Row className='mt-3'>
     <Autocomplete
        multiple
        id="tags-outlined"
        options={tag.tags}
        filterSelectedOptions
        onChange={(event, newValue) => setSelectedTags(newValue + ' ')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
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