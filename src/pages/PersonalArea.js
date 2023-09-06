import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PersonalItems from '../components/PersonalItem';
import {personalReviews} from '../http/reviewAPI';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from 'react-markdown';
import ImageUpload from '../components/ImageUpload'

const PersonalArea = observer(() => {
    const {review} = useContext(Context)
    const {id} = useParams();
    const [markdown, setMarkdown] = useState();
    const [title, setTitle] = useState();
    const [piece, setPiece] = useState();
    useEffect(() => {
       personalReviews(id).then(data => review.setPersonalReview(data))
    }, [])
  return (
    <Container>
    <Row>
        <Col md={6}>
        <ListGroup className='w-50 mt-2'>
            <ListGroup.Item>Open in preview mode</ListGroup.Item>
            <ListGroup.Item>Delete</ListGroup.Item>
        </ListGroup>
        <Form>
            <Form.Label>Title</Form.Label>
            <Form.Control></Form.Control>
        <Form.Control 
                as="textarea" 
                value={markdown} 
                onChange={e=> setMarkdown(e.target.value)}
                rows={3}
                />
        <ImageUpload/>
        <ReactMarkdown children={markdown}></ReactMarkdown>
        </Form>
        </Col>
        <Col md={5}></Col>
        <PersonalItems/>
    </Row>
  </Container>
  )
})

export default PersonalArea