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
import { fetchOneReview, putRatingReview, checkLike, putLikeReview, countLikes, pieceReviews, getAvarageRating} from '../http/reviewAPI';
import { red } from '@mui/material/colors';
import ReactMarkdown from 'react-markdown';
import Comment from '../components/Comment';
import { useTranslation } from 'react-i18next';
import {NavLink} from 'react-router-dom';
import { REVIEW_ROUTE } from '../utils/consts';

const Review = observer(() => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const [like, setLike] = useState();
  const {id} = useParams();
  const {user} = useContext(Context);
  const {review} = useContext(Context);
  const [authorsLikes, setAuthorsLikes] = useState(0);
  const [userName, setUserName] = useState('');
  const [links, setLinks] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchOneReview(id).then(data => {
      review.setReview(data)
      setValue(data.rating)
    })
    checkLike(user.user.id, id).then(data => {
      setLike(data);
    })
    countLikes(id).then(data => {
      setAuthorsLikes(data.countLikes)
      setUserName(data.userName)
    })
    pieceReviews(id).then(data => {
      setLinks(data)
    }).catch(err => console.log(err))
  }, [id])

  useEffect(() => {
    getAvarageRating(id).then(data => setRating(data))
  }, [id, rating, value])

  const handleRating = (event, newValue) => {
    setValue(newValue);
    putRatingReview(id, user.user.id, newValue).then()
  }

  const handleLike = () => {
    if(like) {
      setAuthorsLikes(prev => prev-1)
    } else {
      setAuthorsLikes(prev => prev+1)
    }
    setLike((prev) => !prev)
    putLikeReview(user.user.id, id).then(data => {
      review.setReview(data)}
    )
  }

  return (
    <Container className = 'mt-4'>
      <Row>
        <Col md={3}>
        <Image className='app_auth' src={review.review.img} thumbnail /> 
        </Col>
        <Col md={7}>
        <Card className='app_auth' style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>{review.review.title}</Card.Title>
          <Card.Text>{t("personal.group")}: {review.review.group}</Card.Text>
          <Card.Text>{t("personal.piece")}: {review.review.piece}</Card.Text>
          <div className='d-flex'>
            <Card.Text className='pe-4'>{t("review.rating")}: {value}</Card.Text>
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
          <Card.Text>{t("review.grade")}: {review.review.grade}</Card.Text>
          <Card.Text>{t("review.tag")}: {review.review.tag && review.review.tag.map((tag, index) => <span key ={index}>{tag + ' '}</span>)}</Card.Text>
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
          {t("review.likes")}: {review.review.likes ? review.review.likes.length : 0}
            <div>
              <FavoriteBorderIcon/>
            </div>
          </div>
          }
          <Card.Text className='mt-2 mb-2'>{t("review.total")} {userName}: {authorsLikes}</Card.Text>
          <Card.Text>{t("review.date")}: {review.review.dateCreation && review.review.dateCreation.slice(0, 10)}</Card.Text>
        </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row>
      <Row>
      {links.length > 0 ? <Card.Title className='mb-2 mt-2 app_title'>{t("piece.message")} {t("piece.rating")} {rating} :</Card.Title> : <></>}
      {links.map(elem => 
           <NavLink to={REVIEW_ROUTE + '/' + elem}>
              {window.location.href.split('/').slice(0,4).join('/') + '/' + elem}
            </NavLink>
          )}
      </Row>
      </Row>
       <Comment review = {id}/>
    </Container>
  )
})

export default Review