import React, { useContext, useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Context } from '../index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PersonalItems from '../components/PersonalItem';
import {personalReviews, fetchPieceTitles, createReview, deleteReview, oneReview, updateReview, getTags} from '../http/reviewAPI';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from 'react-markdown';
import ImageUpload from '../components/ImageUpload';
import {GROUPS} from '../utils/consts';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {REVIEW_ROUTE} from '../utils/consts'
import SortReview from '../components/SortReview';
import AdminBreadcrumbs from '../components/AdminBreadcrumbs';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

const PersonalArea = observer(() => {
    const { t, i18n } = useTranslation();
    const {review} = useContext(Context)
    const {user} = useContext(Context)
    const {id} = useParams();
    const [markdown, setMarkdown] = useState('');
    const [title, setTitle] = useState('');
    const [piece, setPiece] = useState(review.pieceTitles[0]);
    const [group, setGroup] = useState('Book');
    const [grade, setGrade] = useState(0);
    const [tagReview, setTagReview] = useState([]);
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState();

    const navigation = useNavigate();
    
    useEffect(() => {
       personalReviews(id).then(data => review.setPersonalReview(data))
       fetchPieceTitles().then(data => review.setPieseTitles(data))
       getTags().then(data => setTags(data.map(elem => elem.value)))
    }, [])

    useEffect(() => {
        if(review.selectedReview) {
            oneReview(review.selectedReview._id).then(data => {
                setTitle(data.title);
                setPiece(data.piece);
                setGroup(data.group);
                setGrade(data.grade);
                setMarkdown(data.description);
                review.setSelectedImg({img: data.img, publicId: data.publicId});
            })
        }
    }, [review, review.selectedReview])

    const addReview = () => { 
        const input = inputTag ? inputTag.split(' ').filter(elem => elem.length !== 0) : [];
        const resTags = input.concat(tagReview);
        if(title && piece && group && resTags && markdown && grade && review.selectedImg.img && review.selectedImg.publicId && id && review.selectedImg) {
            if(review.selectedImg) {
                createReview(title, piece, group, resTags, markdown, grade, review.selectedImg.img, review.selectedImg.publicId, id).then(data => review.addPersonalReview(data.review));
                cleanReview();
            } 
        } else {
            alert('Please enter all fields!')
        }
    }
    const deleteOneReview = () => {
        deleteReview(review.selectedReview._id).then(data => console.log(data))
        review.deletePersonalReview(review.selectedReview._id)
        cleanReview();
    }
    const openReview = () => {
        if(review.selectedReview._id) 
        navigation(REVIEW_ROUTE + '/' + review.selectedReview._id)
    }
    const updateOneReview = () => {
        const input = inputTag ? inputTag.split(' ').filter(elem => elem.length !== 0) : [];
        const resTags = input.concat(tagReview);
        if(title && piece && group && resTags && markdown && grade && review.selectedImg.img && review.selectedImg.publicId && id && review.selectedImg) {
            updateReview(review.selectedReview._id, title, piece, group, resTags, markdown, grade, review.selectedImg.img, review.selectedImg.publicId)
            .then(data => review.updatePersonalReview(data))
            cleanReview();
        } else {
            alert('Please enter all fields!')
        }
    }
    const cleanReview = () => {
        setTitle('');
        setPiece('');
        setGroup('');
        setGrade(0);
        setTagReview('');
        setMarkdown('');
        review.setSelectedImg({});
        review.setSelectedReview({});
    }
  return (
    <Container className='app_personal'>
    {user.isAdmin && <AdminBreadcrumbs/>}
        <Form>
        <Row className="mb-1">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label className="mb-1">{t("personal.title")}</Form.Label>
            <Form.Control
                required
                value={title} 
                onChange={e=> setTitle(e.target.value)}
            />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label className="mb-1">{t("personal.group")}</Form.Label>
            <Form.Select
                onChange={e=> setGroup(e.target.value)}
            >
                <option></option>
                {GROUPS.map((group)=> 
                    <option value={group}>{group}</option>
                )}
            </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label className='mb-1'>{t("personal.tag")}</Form.Label>
            <Autocomplete
            className="app_form"
            multiple
            id="size-small-standard-multi"
            size="small"
            options={tags}
            freeSolo
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => setTagReview(newValue)}
            inputValue={inputTag}   
            onInputChange={(event, newInputValue) => {
                setInputTag(newInputValue);
            }}
            renderInput={(params) => (
            <TextField
                className="app_form"
                {...params}
                variant="standard"
                label={t("personal.tagInfo")}
                placeholder={t("personal.tag")}
            />
            )}
            />
        </Form.Group>
        </Row>
        <Row className="mb-1">
        <Form.Label>{t("personal.piece")}</Form.Label>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Select
            onChange={e=> setPiece(e.target.value)}
            >
                <option></option>
                {review.pieceTitles.map((title)=> 
                    <option value={title}>{title}</option>
                )}
            </Form.Select>
            <Form.Text className="app_form">
            {t("personal.info")}
            </Form.Text>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Control
                required
                value={piece} 
                onChange={e=> setPiece(e.target.value)}
            />
            <Form.Text className="app_form">
            {t("personal.infoPiece")}
            </Form.Text>
        </Form.Group>
        </Row>
        <Form.Label>{t("personal.description")}</Form.Label>
        <Row className="mb-4">
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
            <Card className='app_markdown' style={{ height: '100%'}}>
                <ReactMarkdown className='app_markdown' children={markdown} />
            </Card> 
        </Form.Group>
        </Row>
        <Row className="mb-2">
            <Col md={4} >
            <ImageUpload/>
            </Col>
        <Col md={4} className='d-flex justify-content-between align-items-center'>
            <Form.Label>{t("personal.grade")}</Form.Label>
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
            <Button onClick={addReview}>{t("personal.add")}</Button>
            <Button className='ms-2' onClick={updateOneReview}>{t("personal.update")}</Button>
            <Button className='ms-2' onClick={cleanReview}>{t("personal.clean")}</Button>
        </Col>
        </Row>
        </Form>
        <Row>
            <Col md={3}>
                <ListGroup>
                    <ListGroup.Item 
                        className='app_list'
                        onClick={openReview} 
                        style={{cursor: 'pointer'}}>
                            {t("personal.open")}
                    </ListGroup.Item>
                    <ListGroup.Item 
                        className='app_list'
                        onClick={deleteOneReview} 
                        style={{cursor: 'pointer'}}>
                            {t("personal.delete")}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        <SortReview/>
        </Row>
        <PersonalItems/>
  </Container>
  )
})

export default PersonalArea