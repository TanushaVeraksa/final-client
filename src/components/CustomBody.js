import React from 'react'
import Card from 'react-bootstrap/Card';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function CustomBody() {
  return (
    <Card bg='light' className='px-5 pb-3 m-auto'>
        <CloudUploadIcon className='m-auto' color="primary" sx={{ fontSize: '8rem' }}/>
            <Card.Text className='m-auto'>
                Drag and Drop Files Here
            </Card.Text>
            <Card.Text className='m-auto'>
                Or
            </Card.Text>
            <Card.Text className='m-auto'>
                Select Files
            </Card.Text>
    </Card>
  )
}

export default CustomBody