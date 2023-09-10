import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PersonalItems from '../components/PersonalItem';
import {personalReviews, fetchPieceTitles, createReview, deleteReview, oneReview, updateReview} from '../http/reviewAPI';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from 'react-markdown';
import ImageUpload from '../components/ImageUpload';
import {GROUPS} from '../utils/consts';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {REVIEW_ROUTE} from '../utils/consts'

const PersonalArea = observer(() => {
    const {review} = useContext(Context)
    const {id} = useParams();
    const [markdown, setMarkdown] = useState('');
    const [title, setTitle] = useState('');
    const [piece, setPiece] = useState(review.pieceTitles[0]);
    const [group, setGroup] = useState('Book');
    const [grade, setGrade] = useState(0);
    const [tag, setTag] = useState('');
    const navigation = useNavigate ();
    
    useEffect(() => {
       personalReviews(id).then(data => review.setPersonalReview(data))
       fetchPieceTitles().then(data => review.setPieseTitles(data))
    }, [])

    useEffect(() => {
        if(review.selectedReview) {
            oneReview(review.selectedReview._id).then(data => {
                setTitle(data.title);
                setPiece(data.piece);
                setGroup(data.group);
                setGrade(data.grade);
                setTag(data.tag);
                setMarkdown(data.description);
                review.setSelectedImg({img: data.img, publicId: data.publicId});
            })
        }
    }, [review, review.selectedReview])

    const addReview = () => { 
        if(review.selectedImg) {
        createReview(title, piece, group, tag, markdown, grade, review.selectedImg.img, review.selectedImg.publicId, id).then(data => review.addPersonalReview(data.review));
        cleanReview();
    } 
    }
    const deleteOneReview = () => {
        deleteReview(review.selectedReview._id).then(data => console.log(data))
        review.deletePersonalReview(review.selectedReview._id)
    }
    const openReview = () => {
        navigation(REVIEW_ROUTE + '/' + review.selectedReview._id)
    }
    const updateOneReview = () => {
        updateReview(review.selectedReview._id, title, piece, group, tag, markdown, grade, review.selectedImg.img, review.selectedImg.publicId)
        .then(data => review.updatePersonalReview(data))
        cleanReview();
    }
    const cleanReview = () => {
        setTitle('');
        setPiece('');
        setGroup('');
        setGrade(0);
        setTag('');
        setMarkdown('');
        review.setSelectedImg({});
        review.setSelectedReview({});
    }
  return (
    <Container>
        <Form>
        <Row className="mb-2">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label className="mb-1">Title</Form.Label>
            <Form.Control
                required
                value={title} 
                onChange={e=> setTitle(e.target.value)}
            />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Group</Form.Label>
            <Form.Select
                onChange={e=> setGroup(e.target.value)}
            >
                <option>Default</option>
                {GROUPS.map((group)=> 
                    <option value={group}>{group}</option>
                )}
            </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Tag</Form.Label>
            <Form.Control
                required
                value={tag} 
                onChange={e=> setTag(e.target.value)}
            />
        </Form.Group>
        </Row>
        <Row className="mb-2">
        <Form.Label>Piece of Art</Form.Label>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Select
            onChange={e=> setPiece(e.target.value)}
            >
                <option>Default</option>
                {review.pieceTitles.map((title)=> 
                    <option value={title}>{title}</option>
                )}
            </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Control
                required
                value={piece} 
                onChange={e=> setPiece(e.target.value)}
            />
            </Form.Group>
        </Row>
        <Form.Label>Description</Form.Label>
        <Row className="mb-2">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Control 
                required
                as="textarea" 
                value={markdown} 
                onChange={e=> setMarkdown(e.target.value)}
                rows={5}
            />
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Card bg='light' style={{ height: '100%'}}>
                <ReactMarkdown children={markdown} />
            </Card> 
        </Form.Group>
        </Row>
        <Row className="mb-2">
            <Col md={4} >
            <ImageUpload/>
            </Col>
        <Col md={4} className='d-flex justify-content-between align-items-center'>
            <Form.Label>Author's grade</Form.Label>
            <input 
                required
                type="range" 
                value = {grade} 
                className="form-range w-50" 
                min="0" 
                max="10" 
                step="1" 
                onChange={e => setGrade(+e.target.value)}/>
            <Form.Label>{grade}</Form.Label>
        </Col>
        <Col md={4} className='d-flex justify-content-end align-items-center'>
            <Button onClick={addReview}>Add</Button>
            <Button className='ms-2' onClick={updateOneReview}>Update</Button>
            <Button className='ms-2' onClick={cleanReview}>Clean</Button>
        </Col>
        </Row>
        </Form>
        <ListGroup className='w-50 mt-2'>
            <ListGroup.Item onClick={openReview} style={{cursor: 'pointer'}}>Open in preview mode</ListGroup.Item>
            <ListGroup.Item onClick={deleteOneReview} style={{cursor: 'pointer'}}>Delete</ListGroup.Item>
        </ListGroup>
        <PersonalItems/>
  </Container>
  )
})

export default PersonalArea