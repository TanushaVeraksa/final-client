import React from 'react'
import Card from 'react-bootstrap/Card';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';

function CustomBody() {
  const { t, i18n } = useTranslation();
  return (
    <Card bg='light' className='px-5 pb-2 m-auto' >
        <CloudUploadIcon className='m-auto' color="primary" sx={{ fontSize: '5rem' }}/>
        <Card.Text style={{fontSize: '0.8rem'}} className='m-auto'>
          {t("image.drag")}
        </Card.Text>
        <Card.Text style={{fontSize: '0.8rem'}} className='m-auto'>
          {t("image.or")}
        </Card.Text>
        <Card.Text style={{fontSize: '0.8rem'}} className='m-auto'>
          {t("image.select")}
        </Card.Text>
    </Card>
  )
}

export default CustomBody