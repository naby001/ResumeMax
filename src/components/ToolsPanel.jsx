import React, { useState } from 'react';
import { Box, Button, Divider, Typography, Select, MenuItem, IconButton, List, ListItem, ListItemIcon } from '@mui/material';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import CropIcon from '@mui/icons-material/Crop';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ToolsPanel = () => {
  const [activeTab, setActiveTab] = useState('text'); // Tracks which tab is active

  return (
    <Box
      display="flex"
      bgcolor="white"
      width={600}
      height="100vh"
      borderRadius={3}
      boxShadow={6}
    >
      {/* Left Column - Main options */}
      <Box
        width={100}
        bgcolor="primary.main"
        paddingTop={2}
        paddingRight={2}
        paddingLeft={2}
      
        display="flex"
        flexDirection="column"
        gap={3}
        alignItems="center"
        boxShadow={3}
      >
        <List>
          <ListItem
            button
            onClick={() => setActiveTab('text')}
            sx={{
              borderRadius: '50%',
              backgroundColor: activeTab === 'text' ? 'secondary.main' : 'transparent',
              padding: 1,
              '&:hover': {
                backgroundColor: 'secondary.main',
               
              },
            }}
          >
            <ListItemIcon>
              <TextFieldsIcon color="inherit" />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveTab('image')}
            sx={{
              borderRadius: '50%',
              backgroundColor: activeTab === 'image' ? 'secondary.main' : 'transparent',
              padding: 1,
              '&:hover': {
                backgroundColor: 'secondary.main',
              },
              
            }
          }
          >
            <ListItemIcon>
              <ImageIcon color="inherit" />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            onClick={() => setActiveTab('shapes')}
            sx={{
              borderRadius: '50%',
              backgroundColor: activeTab === 'shapes' ? 'secondary.main' : 'transparent',
              padding: 1,
              '&:hover': {
                backgroundColor: 'secondary.main',
              },
            }}
          >
            <ListItemIcon>
              <CropIcon color="inherit" />
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>

      {/* Right Column - Sub-options */}
      <Box
        flexGrow={1}
        p={3}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {activeTab === 'text' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary.main">Text</Typography>
            <Button variant="contained" fullWidth sx={{ mb: 2, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}>
              Add Text Box
            </Button>
            <Button variant="contained" fullWidth sx={{ mb: 2, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}>
              Add Shape</Button>
            
            <Select defaultValue="Arial" fullWidth sx={{ mb: 2 }}>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Roboto">Roboto</MenuItem>
            </Select>
            <Select defaultValue={16} fullWidth sx={{ mb: 2 }}>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <Select defaultValue="black" fullWidth>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
              <MenuItem value="red">Red</MenuItem>
            </Select>
          </Box>
        )}

        {activeTab === 'image' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom color="primary.main">Uploads</Typography>
            <Button variant="contained" fullWidth component="label" sx={{ mb: 2 }}>
              Choose Image
              <input type="file" hidden />
            </Button>
            <Box mt={2}>
              <Typography variant="body2" fontWeight="bold">Uploaded Image:</Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 150,
                  borderRadius: 2,
                  bgcolor: 'lightgrey',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 1
                }}
              >
                <Typography variant="body2">Image preview</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {activeTab === 'shapes' && (
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary.main">Shapes & Icons</Typography>
            <Box display="flex" gap={3} flexWrap="wrap"> {/* Increased gap between icons */}
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
            </Box>
            <Box mt={2}>
              <Button variant="outlined" fullWidth sx={{ mb: 2 }}>Add Shape</Button>
              <Button variant="outlined" fullWidth>Add Icon</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ToolsPanel;
