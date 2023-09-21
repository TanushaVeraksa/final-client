import React, { useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getUsers} from '../http/adminAPI';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {NavLink} from 'react-router-dom';
import { PERSONAL_ROUTE } from '../utils/consts';
import { useTranslation } from 'react-i18next';

const Admin = () => {
  const { t, i18n } = useTranslation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => setUsers(data))
  })

  return (
    <Container>
      <Row>
      <Col className='m-auto'>
      <Table 
        responsive
        striped 
        bordered 
        hover 
        variant={localStorage.getItem('theme')}
        >
      <thead>
        <tr>
          <th>#</th>
          <th>{t("admin.name")}</th>
          <th>{t("admin.email")}</th>
          <th>{t("admin.role")}</th>
          <th>{t("admin.page")}</th>
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
              <NavLink style={{color: 'white', textDecoration: 'none' }} to={PERSONAL_ROUTE + '/' + user._id}>{t("admin.area")}</NavLink>
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