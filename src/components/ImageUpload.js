import React, { useContext, useState } from 'react';
import FileUpload from 'react-drag-n-drop-image';
import CustomBody from './CustomBody';
import Image from 'react-bootstrap/Image';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';
import axios from 'axios';
import {destroyImage} from '../http/reviewAPI';

const ImageUpload = observer(() => {
  const [files, setFiles] = useState([]);
  const {review} = useContext(Context);
  const preset_key = 'escoid4t';

  const onChange = file => {
    const formData = new FormData();
    formData.append('file', file[0].file);
    formData.append('upload_preset', preset_key);
    axios.post('https://api.cloudinary.com/v1_1/dshdtks2s/image/upload', formData)
      .then(data => {
        review.setSelectedImg({img: data.data.secure_url, publicId: data.data.public_id})
      })
      .catch(err => console.log(err))
    setFiles(file);
  };


  const onRemoveImage = async id => {
    destroyImage(review.selectedImg.public_id)
      .then(data => console.log(data))
      .catch(err => console.log(err))
    setFiles(prev => prev.filter(i => i.id !== id));
    review.setSelectedImg({})
  };

  const onError = error => {
    console.error(error);
  };
  


  return (
    <div>
      <FileUpload onError={onError} body={<CustomBody/>} overlap={false} fileValue={files} onChange={onChange}/>
      <div className='d-flex'>
        {/* {files.map(item => {
          return ( */}
            <div onClick={() => onRemoveImage(files.id)} aria-hidden style={{ margin: 10 }} key={files.id}>
              {review.selectedImg.img && <Image width={100} height={100} className='img-responsive' src={review.selectedImg.img} rounded />}
            </div>
          {/* );
        })} */}
      </div>
    </div>
  );
})

export default ImageUpload;