import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ImageComponentProps {
  defaultImage: string;
  photo: string
}

const ScrollBarImage: React.FC<ImageComponentProps> = ({ defaultImage, photo }) => {
  const [image, setImage] = useState<string>(photo||defaultImage);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    container.scrollLeft += event.deltaY;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      onWheel={handleScroll}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="300px"
        height="300px"
        border="1px solid black"
        sx={{
          backgroundImage: `url(http://localhost:3000/images/${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box margin={'20px 0'} width={"100%"} display={"flex"} flexDirection={"column"} gap={'20px'}>
        <Button variant="contained" component="label" fullWidth>
          Add as model image
        </Button>
        <Button variant="contained" component="label" fullWidth>
          Add as face image
        </Button>
        <Button variant="contained" component="label" color="error" fullWidth>
          Delete from storage
        </Button>
      </Box>
    </Box>
  );
};

export default ScrollBarImage;
