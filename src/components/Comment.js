import React, {useEffect, useState, useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {sendComment, getComments, getComment} from '../http/commentAPI'
import {Context} from '../index'
import {observer} from 'mobx-react-lite'

const Comment = observer((props) => {
    const [value, setValue] = useState();
    const {review} = props;
    const [comments, setComments] = useState([]);
    const TIMER = 3000;
    const {user} = useContext(Context);
    const {comment} = useContext(Context);

    useEffect(() => {
        getComments(review).then(data=> {
            setComments(data)
            comment.setReviewComments(data)
        })
    }, [])


    const subscribe = async() => {
        try {
            getComment(comment.reviewComments, review, user.user.email)
                .then(data => console.log(data))
                .catch(err => subscribe())
                console.log(comment.reviewComments)
            setTimeout(() => {
                subscribe();
            }, TIMER)
        } catch (e) {
            setTimeout(() => {
                subscribe();
            }, TIMER)
        }
    }

    const sendMessage = () => {
        sendComment(value, user.user.email, review).then(data => setComments(prev => [...prev, data]))
    }

    return (
    <Row>
    <Form.Label>Comment</Form.Label>
    {user.isAuth && 
    <>
        <Form.Control
        type="text"
        value={value}
        onChange={e=> setValue(e.target.value)}
    />

    <Button variant="primary" className='w-25' onClick={sendMessage}>Send</Button>
    </>
    }
    
    {comments.map(comment => 
    <Card key={comment._id}>
        <Card.Body className='p-2'>
            <Card.Subtitle className="mb-1 text-muted">{comment.userEmail}</Card.Subtitle>
            <Card.Text>{comment.message}</Card.Text>
        </Card.Body>
    </Card>
    )}
    </Row>
    )
})

export default Comment