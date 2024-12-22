import React, { useState } from 'react';
import { Box, Button, Divider, Typography, Select, MenuItem, IconButton, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
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
      boxShadow={3}
    >
      {/* Left Column - Main options */}
      <Box
        width={60}
        bgcolor="white"
        paddingTop={2}
        paddingRight={2}
        borderRadius={2}
       
        display="flex"
        flexDirection="column"
        gap={2}
      >
        
        <List>
          <ListItem button onClick={() => setActiveTab('text')} style={{marginBottom:50, borderRadius:20, alignItems:'center'}} >
            <ListItemIcon>
              <TextFieldsIcon color="primary" />
            </ListItemIcon>
           
          </ListItem>
          <ListItem button onClick={() => setActiveTab('image')} style={{marginBottom:50}}>
            <ListItemIcon>
              <ImageIcon color="primary" />
            </ListItemIcon>
            
          </ListItem>
          <ListItem button onClick={() => setActiveTab('shapes')} style={{marginBottom:50}}>
            <ListItemIcon>
              <CropIcon color="primary" />
            </ListItemIcon>
            
          </ListItem>
        </List>
      </Box>

      {/* Right Column - Sub-options */}
      <Box
        flexGrow={1}
        p={2}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {activeTab === 'text' && (
          <Box>
            <Typography variant="h6" fontWeight="bold">Text</Typography>
            <Button variant="outlined" fullWidth sx={{ mb: 2 }}>Add Text Box</Button>
            <Button variant="outlined" fullWidth sx={{ mb: 2 }}>Add Shape</Button>
            
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
            <Typography variant="h6" fontWeight="bold" gutterBottom>Uploads</Typography>
            <Button variant="outlined" fullWidth component="label">
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
            <Typography variant="h6" fontWeight="bold">Shapes & Icons</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              <IconButton>
                <InsertEmoticonIcon />
              </IconButton>
              <IconButton>
                <GitHubIcon />
              </IconButton>
              <IconButton>
                <PhoneIcon />
              </IconButton>
              <IconButton>
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
