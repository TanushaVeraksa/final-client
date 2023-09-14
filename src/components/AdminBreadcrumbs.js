import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { ADMIN_ROUTE } from '../utils/consts';
import {NavLink} from 'react-router-dom';

function handleClick(event) {
  event.preventDefault();
}

export default function AdminBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick} className='m-2'>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink style={{color: 'inherit', textDecoration: 'none' }} to={ADMIN_ROUTE}>Admin Panel</NavLink>
        <Typography color="text.primary">Personal Area</Typography>
      </Breadcrumbs>
    </div>
  );
}