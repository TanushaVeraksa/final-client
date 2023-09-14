import React, { useContext , useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchOneReview, putRatingReview, checkLike, putLikeReview } from '../http/reviewAPI';
import { red } from '@mui/material/colors';
import ReactMarkdown from 'react-markdown';
import Comment from '../components/Comment';

const Review = observer(() => {
  const [value, setValue] = useState(0);
  const [like, setLike] = useState();
  const {id} = useParams();
  const {user} = useContext(Context);
  const {review} = useContext(Context);
  useEffect(() => {
    fetchOneReview(id).then(data => {
      review.setReview(data)
      setValue(data.rating)
    })
    checkLike(user.user.id, id).then(data => {
      setLike(data);
    })
  }, [])

  const handleRating = (event, newValue) => {
    setValue(newValue);
    putRatingReview(id, user.user.id, newValue).then()
  }

  const handleLike = () => {
    setLike((prev) => !prev)
    putLikeReview(user.user.id, id).then(data => {
      review.setReview(data)}
    )
  }

  return (
    <Container className = 'mt-4'>
      <Row>
        <Col md={3}>
        <Image  src={review.review.img} thumbnail /> 
        </Col>
        <Col md={7}>
        <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>{review.review.title}</Card.Title>
          <Card.Text>Group: {review.review.group}</Card.Text>
          <div className='d-flex'>
            <Card.Text className='pe-4'>Rating: {value}</Card.Text>
            {user.isAuth ? 
              <Rating
              name="simple-controlled"
              value={value}
              onChange={handleRating}
            />
            :
            <Rating name="read-only" value={value} readOnly />
            }
          </div>
          <Card.Text>Author grade: {review.review.grade}</Card.Text>
          <ReactMarkdown>{review.review.description}</ReactMarkdown>
          {user.isAuth ? 
            <div className='d-flex'>
            Likes: {review.review.likes ? review.review.likes.length : 0}
            <div>
              {like ? 
              <FavoriteIcon sx={{ color: red[500] }} style={{cursor: 'pointer'}} onClick={handleLike}/> 
              : 
              <FavoriteBorderIcon style={{cursor: 'pointer'}} onClick={handleLike}/>}
            </div>
          </div>
          : 
          <div className='d-flex'>
          Likes: {review.review.likes ? review.review.likes.length : 0}
            <div>
              <FavoriteBorderIcon/>
            </div>
          </div>
          }
          <Card.Text>Date of creation: {review.review.dateCreation}</Card.Text>
        </Card.Body>
        </Card>
        </Col>
      </Row>
       {/* <Comment review = {id}/> */}
    </Container>
  )
})

export default Review