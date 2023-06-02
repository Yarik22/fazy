import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ImageComponentProps {
  defaultImage: string;
  id:number
}

const ImageComponent: React.FC<ImageComponentProps> = ({ defaultImage, id}) => {
  const [image, setImage] = useState<string>(defaultImage);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        setImage(event.target.result.toString());
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
        <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="300px"
                height="300px"
                border="1px solid black"
                sx={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </Box>
            <Box marginBottom={'20px'} width={"100%"}>
            <Button variant="contained" component="label" fullWidth>
            Upload Image
            <input type="file" accept="image/*" name={`file${id}`} hidden onChange={handleImageUpload}/>
            </Button>
            </Box>
        </Box>
    </>
    );
};

export default ImageComponent;
