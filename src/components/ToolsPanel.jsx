import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Modal,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Tooltip
} from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import CropIcon from '@mui/icons-material/Crop';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import TextBoxIcon from '../assets/images/text-box.png';
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/CheckBoxOutlineBlank'; // For rectangle (square-like icon)
import RemoveIcon from '@mui/icons-material/Remove'; // For line
const ToolsPanel = ({addTextBox, addShape}) => {
  const [activeTab, setActiveTab] = useState('text');
  const [imagePreview, setImagePreview] = useState(null);
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [generatedTable, setGeneratedTable] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleGenerateTable = () => {
    const numRows = parseInt(rows, 10);
    const numCols = parseInt(columns, 10);

    if (isNaN(numRows) || isNaN(numCols) || numRows <= 0 || numCols <= 0) {
      alert('Please enter valid numbers for rows and columns.');
      return;
    }

    const tableRows = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => 'Cell')
    );

    setGeneratedTable(tableRows);
    setTableModalOpen(false);
  };

  return (
    <Box
      display="flex"
      bgcolor="white"
      //width={600}
      height="100vh"
      borderRadius={3}
      boxShadow={6}
    >
      {/* Left Column */}
      <Box
        width={80}
       // bgcolor="primary.main"
        paddingTop={2}
        paddingRight={1}
        paddingLeft={1}
        display="flex"
        flexDirection="column"
        gap={3}
        alignItems="center"
        boxShadow={3}
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background
          backdropFilter: 'blur(10px)', // Blur effect
          borderRadius: 2, // Rounded corners
          border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border for glass effect
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Shadow for depth
        }}
      >
        <List>
        <ListItem
  onClick={() => setActiveTab('text')}
  sx={{
    borderRadius: 4,
    backgroundColor: activeTab === 'text' ? '#1b1b2f' : 'transparent', // Dark navy blue when active
    height: 50,
    width: 50,
    marginBottom: 5,
    alignItems: 'center',
    color: activeTab === 'text' ? '#ffffff' : '#cfcfcf', // White text when active, light gray otherwise
    boxShadow: activeTab === 'text'
      ? '0px 6px 10px rgba(0, 0, 0, 0.8), inset 0px 2px 4px rgba(255, 255, 255, 0.2)' // Stronger shadow when active
      : '0px 3px 6px rgba(0, 0, 0, 0.4)',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s',
    '&:hover': {
      backgroundColor: '#1f4068', // Brighter navy blue on hover
      color: '#ffffff', // White text on hover
      boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.9), 0px -4px 8px rgba(255, 255, 255, 0.2)', // Elevated shadow
      transform: 'translateY(-2px)', // Slight lift on hover
    },
    '&:active': {
      backgroundColor: '#000000', // Turns black on click
      color: '#ffffff', // Ensures text stays white
      boxShadow: 'inset 0px 4px 6px rgba(255, 255, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.6)', // Inset shadow for pressed effect
      transform: 'translateY(1px)', // Slight sink on click
    },
  }}
>


            <ListItemIcon>
              <TextFieldsIcon sx={{ 
    color: activeTab === 'text' ? '#ffffff' : '#cfcfcf' 
  }} />
            </ListItemIcon>
          </ListItem>
          <ListItem
  onClick={() => setActiveTab('image')}
  sx={{
    borderRadius: 4,
    backgroundColor: activeTab === 'image' ? '#1b1b2f' : 'transparent', // Dark navy blue when active
    height: 50,
    width: 50,
    marginBottom: 5,
    alignItems: 'center',
    boxShadow: activeTab === 'image'
      ? '0px 6px 10px rgba(0, 0, 0, 0.8), inset 0px 2px 4px rgba(255, 255, 255, 0.2)' // Stronger shadow when active
      : '0px 3px 6px rgba(0, 0, 0, 0.4)',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s',
    '&:hover': {
      backgroundColor: '#1f4068', // Brighter navy blue on hover
      color: '#ffffff', // White text on hover
      boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.9), 0px -4px 8px rgba(255, 255, 255, 0.2)', // Elevated shadow
      transform: 'translateY(-2px)', // Slight lift on hover
    },
    '&:active': {
      backgroundColor: '#000000', // Turns black on click
      color: '#ffffff', // Ensures text stays white
      boxShadow: 'inset 0px 4px 6px rgba(255, 255, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.6)', // Inset shadow for pressed effect
      transform: 'translateY(1px)', // Slight sink on click
    },
  }}
>
            <ListItemIcon>
              <ImageIcon  sx={{ 
    color: activeTab === 'image' ? '#ffffff' : '#cfcfcf' 
  }}  />
            </ListItemIcon>
          </ListItem>
          <ListItem
  onClick={() => setActiveTab('shapes')}
  sx={{
    borderRadius: 4,
    backgroundColor: activeTab === 'shapes' ? '#1b1b2f' : 'transparent', // Dark navy blue when active
    height: 50,
    width: 50,
    marginBottom: 5,
    alignItems: 'center',
    boxShadow: activeTab === 'shapes'
    ? '0px 6px 10px rgba(0, 0, 0, 0.8), inset 0px 2px 4px rgba(255, 255, 255, 0.2)' // Stronger shadow when active
    : '0px 3px 6px rgba(0, 0, 0, 0.4)',
  transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s',
  '&:hover': {
    backgroundColor: '#1f4068', // Brighter navy blue on hover
    color: '#ffffff', // White text on hover
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.9), 0px -4px 8px rgba(255, 255, 255, 0.2)', // Elevated shadow
    transform: 'translateY(-2px)', // Slight lift on hover
  },
  '&:active': {
    backgroundColor: '#000000', // Turns black on click
    color: '#ffffff', // Ensures text stays white
    boxShadow: 'inset 0px 4px 6px rgba(255, 255, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.6)', // Inset shadow for pressed effect
    transform: 'translateY(1px)', // Slight sink on click
  },
  }}
>
            <ListItemIcon>
              <CropIcon  sx={{ 
    color: activeTab === 'shapes' ? '#ffffff' : '#cfcfcf' 
  }}  />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>

      {/* Right Column */}
      <Box width={260} p={3} bgcolor="white" borderRadius={2} boxShadow={3}>
        {activeTab === 'text' && (
          <Box>
           <Button
  variant="contained"
  onClick={addTextBox}
  fullWidth
  sx={{
    mb: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000', // Sleek black background
    color: '#ffffff', // White text
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'none', // Prevents all-uppercase text
    borderRadius: 3, // Smooth rounded edges
   
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: '#1a1a1a', // Slightly lighter black on hover
    
    },
    '&:active': {
      backgroundColor: '#333333', // Darker gray on click
    
    },
    
  }}
  startIcon={
    <img
      src={TextBoxIcon}
      alt="Text Box Icon"
      style={{
        height: '20px',
        width: '20px',
        filter: 'brightness(0) invert(1)', // Ensures icon is white for a black background
        marginRight: '8px',
      }}
    />
  }
>
  Add Text Box
</Button>
            
            
          </Box>
        )}

        {activeTab === 'image' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">
              Uploads
            </Typography>
            <Button variant="contained" fullWidth component="label" sx={{ mb: 2 }}>
              Choose Image
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
            <Box
              sx={{
                mt: 2,
                width: '100%',
                height: 150,
                borderRadius: 2,
                bgcolor: 'lightgrey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <Typography variant="body2">No image selected</Typography>
              )}
            </Box>
          </Box>
        )}

        {activeTab === 'shapes' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              Shapes & Icons
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <InsertEmoticonIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <GitHubIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <PhoneIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <EmailIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <InstagramIcon/>
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                < WhatsAppIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                < LinkedInIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                < TwitterIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: 'lightgrey', '&:hover': { backgroundColor: 'grey' } }}>
                <YouTubeIcon />
              </IconButton>

              {/* Additional icons here */}
            </Box>
            <Box mt={2}>
              <Typography sx={{mt:2, fontWeight:'bold'}}>Shapes</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, mb:2 }} flexWrap="wrap">
            <Tooltip title="Add Circle">
    <IconButton
      onClick={() => addShape('circle')}
      sx={{
        backgroundColor: 'lightgrey',
        color: 'grey',
        '&:hover': {
          backgroundColor: '#BBDEFB',
        },
        fontSize: '20px',
        padding: '6px',
      }}
    >
      <CircleIcon fontSize="small" />
    </IconButton>
  </Tooltip>

  <Tooltip title="Add Rectangle">
    <IconButton
      onClick={() => addShape('rectangle')}
      sx={{
        backgroundColor: 'lightgrey',
        color: 'grey',
        '&:hover': {
          backgroundColor: '#C8E6C9',
        },
        fontSize: '20px',
        padding: '6px',
      }}
    >
      <SquareIcon fontSize="small" />
    </IconButton>
  </Tooltip>

  <Tooltip title="Add Line">
    <IconButton
      onClick={() => addShape('line')}
      sx={{
        backgroundColor: 'lightgrey',
        color: 'grey',
        '&:hover': {
          backgroundColor: '#FFCCBC',
        },
        fontSize: '20px',
        padding: '6px',
      }}
    >
      <RemoveIcon fontSize="small" />
    </IconButton>
  </Tooltip>
  </Box>
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                Add Icon
              </Button>
              <Button variant="outlined" fullWidth onClick={() => setTableModalOpen(true)}>
                Add Table
              </Button>
            </Box>
          </Box>
        )}

        {/* Modal for Adding Table */}
        <Modal open={tableModalOpen} onClose={() => setTableModalOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              width: 300,
            }}
          >
            <Typography variant="h6" mb={2}>
              Add Table
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Rows"
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Columns"
                  value={columns}
                  onChange={(e) => setColumns(e.target.value)}
                  fullWidth
                  type="number"
                />
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" onClick={() => setTableModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleGenerateTable}>
                Generate
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Render Generated Table */}
        {generatedTable && (
          <Box mt={4}>
            <Typography variant="h6">Generated Table:</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {generatedTable[0].map((_, colIndex) => (
                    <TableCell key={colIndex}>Column {colIndex + 1}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {generatedTable.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <TableCell key={colIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ToolsPanel;
