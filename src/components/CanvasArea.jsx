import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import Draggable from 'react-draggable';

const CanvasArea = ({ zoom, pageNumber, textBoxes, setTextBoxes }) => {
  const zoomStyle = {
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'center',
  };

  const handleTextChange = (index, newText) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[index].text = newText;
    setTextBoxes(updatedTextBoxes);
  };

  const handleDrag = (index, data) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[index].x = data.x;
    updatedTextBoxes[index].y = data.y;
    setTextBoxes(updatedTextBoxes);
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

      {/* Render Draggable Text Boxes */}
      {textBoxes?.map((textBox, index) => (
        <Draggable
          key={index}
          defaultPosition={{ x: textBox.x, y: textBox.y }}
          onStop={(e, data) => handleDrag(index, data)}
        >
          <Box
            sx={{
              position: 'absolute',
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              //border: '1px dashed grey',
              borderRadius: '4px',
              cursor: 'move',
            }}
          >
           <TextField
  variant="outlined"
  size="small"
  value={textBox.text}
  onChange={(e) => handleTextChange(index, e.target.value)}
  multiline
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'transparent', // No border by default
      },
      '&:hover fieldset': {
        borderColor: '#00B4D8', // Brighter ocean blue on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0077B6', // Deep ocean blue on focus
        borderWidth: '2px',
      },
    },
  }}
/>

          </Box>
        </Draggable>
      ))}
    </Box>
  );
};

export default CanvasArea;
