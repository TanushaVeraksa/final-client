import React, {useEffect, useState, useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {sendComment, getComments} from '../http/commentAPI'
import {Context} from '../index'
import {observer} from 'mobx-react-lite'
import {$host} from "../http/index";


const Comment = observer((props) => {
    const [value, setValue] = useState();
    const {review} = props;
    const [comments, setComments] = useState([]);
    const TIMER = 500;
    const {user} = useContext(Context);

    useEffect(() => {
        getComments(review).then(data=> setComments(data))
        subscribe()
    }, [])


    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = async() => {
        // try {
        //     const {data} = await $host.get('api/comment/get-comment');
        //     setComments(prev=> [...prev, data])
        //     await subscribe();
        // } catch (e) {
        //     console.log(e)
        //     setTimeout(() => {
        //         subscribe();
        //     }, TIMER)
        // }
        const eventSource = new EventSource('https://final-server-lyart.vercel.app/api/comment/connect')
        eventSource.onmessage = function(event) {
            console.log(event.data)
        }
    }
    const sendMessage = async() => {
        //sendComment(value, user.user.email, review).then(data => console.log(data))
        await $host.post('api/comment/new-comment', {
          message: value, 
          userEmail: user.user.email, 
          reviewId: review 
        })
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