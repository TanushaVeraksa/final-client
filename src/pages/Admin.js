import React, { useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getUsers} from '../http/adminAPI';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {NavLink} from 'react-router-dom';
import { PERSONAL_ROUTE } from '../utils/consts';


const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => setUsers(data))
  })

  return (
    <Container>
      <Row>
      <Col className='m-auto'>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Personal Page</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => 
        <tr key={user._id}>
          <td>{index}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <Button>
              <NavLink style={{color: 'white', textDecoration: 'none' }} to={PERSONAL_ROUTE + '/' + user._id}>Personal Area</NavLink>
            </Button>
          </td>
        </tr>
        )}
      </tbody>
      </Table>
      </Col>
      </Row>
    </Container>
  )
}

export default Admin