import React, { useState } from 'react';
import FileUpload from 'react-drag-n-drop-image';
import CustomBody from './CustomBody';

function ImageUpload() {
  const [files, setFiles] = useState([]);
  const onChange = file => {
    setFiles(file);
  };
  const onRemoveImage = id => {
    setFiles(prev => prev.filter(i => i.id !== id));
  };
  const onError = error => {
    console.error(error);
  };
  return (
    <div>
      <FileUpload onError={onError} body={<CustomBody/>} overlap={false} fileValue={files} onChange={onChange} />
      <div className='upload-image-box'>
        {files.map(item => {
          return (
            <div onClick={() => onRemoveImage(item.id)} aria-hidden style={{ width: 150, height: 150, margin: 10 }} key={item.id}>
              <img style={{ width: 150, height: 150 }} src={item.preview} alt='images' />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageUpload;