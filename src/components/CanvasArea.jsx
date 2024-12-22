import React from 'react';
import { Box } from '@mui/material';

const CanvasArea = ({ zoom, pageNumber }) => {
  const zoomStyle = {
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'center',
  };

  return (
    <Box
      bgcolor="white"
      width="210mm"
      height="297mm"
      boxShadow={3}
      position="relative"
      mb={2}
      
      sx={zoomStyle}
    >
      <Box position="absolute" top={10} left={10} fontSize={12} color="grey.500">
        Page {pageNumber}
      </Box>
    </Box>
  );
};

export default CanvasArea;
