import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface Image {
  id: string;
  title: string;
  imageUrl: string;
}

interface ImageGalleryProps {
  images: Image[];
  onAddImage: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onAddImage }) => {
  return (
    <Box display={"flex"} overflow={'auto'} padding={2}>
      {images.map((image) => (
        <Box key={image.id} display="flex" flexDirection="column" alignItems="center" marginRight={2}>
          <img src={image.imageUrl} alt={image.title} style={{ width: '200px', height: '200px' }} />
          <span>{image.title}</span>
        </Box>
      ))}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginRight={2}
        width="200px"
        height="200px"
        border="1px dashed gray"
        borderRadius={4}
        onClick={onAddImage}
        style={{ cursor: 'pointer' }}
      >
        <Button color="primary">Add New Image</Button>
      </Box>
    </Box>
  );
};

export default ImageGallery;
