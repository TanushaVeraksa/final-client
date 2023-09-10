import React from 'react'
import Card from 'react-bootstrap/Card';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function CustomBody() {
  return (
    <Card bg='light' className='px-5 pb-2 m-auto' >
        <CloudUploadIcon className='m-auto' color="primary" sx={{ fontSize: '5rem' }}/>
        <Card.Text style={{fontSize: '0.8rem'}} className='m-auto'>
            Drag and Drop Files Here
        </Card.Text>
        <Card.Text style={{fontSize: '0.8rem'}} className='m-auto'>
            Or
        </Card.Text>
        <Card.Text style={{fontSize: '0.8rem'}} className='m-auto'>
            Select Files
        </Card.Text>
    </Card>
  )
}

export default CustomBody