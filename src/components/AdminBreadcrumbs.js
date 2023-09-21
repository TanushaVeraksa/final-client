import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { ADMIN_ROUTE } from '../utils/consts';
import {NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function handleClick(event) {
  event.preventDefault();
}

export default function AdminBreadcrumbs() {
  const { t, i18n } = useTranslation();
  return (
    <div role="presentation" onClick={handleClick} className='mt-2 mb-2'>
      <Breadcrumbs className='app_breadcrumbs' aria-label="breadcrumb">
        <NavLink className='app_breadcrumbs' style={{ textDecoration: 'none' }} to={ADMIN_ROUTE}>{t("nav.admin")}</NavLink>
        <Typography className='app_breadcrumbs'>{t("nav.personal")}</Typography>
      </Breadcrumbs>
    </div>
  );
}