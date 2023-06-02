import React, { useRef } from 'react';
import Button from '@mui/material/Button';

interface UploadButtonProps {
  onUploadSuccess: () => void;
  onUploadError: (error: Error) => void;
}

const AddImage: React.FC<UploadButtonProps> = ({ onUploadSuccess, onUploadError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:3000/images/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          onUploadSuccess();
        } else {
          throw new Error('Upload failed');
        }
      })
      .catch((error) => {
        onUploadError(error);
      });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
      <Button variant="contained" onClick={handleButtonClick}>
        Upload Image
      </Button>
    </>
  );
};

export default AddImage;
