'use client'

import { useState } from 'react'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Description,
  AccountTree,
  Work,
  LinkedIn,
  PictureAsPdf,
  Add,
  Assessment,
} from '@mui/icons-material'
import { blue } from '@mui/material/colors'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const theme = createTheme({
  palette: {
    mode: 'dark', // Enable dark mode
    primary: {
      main: blue[600],
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1c1c1c', // Dark card background
    },
    text: {
      primary: '#ffffff', // Light text color
      secondary: '#b0b0b0', // Secondary text color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
})

const drawerWidth = 260

const DashboardPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const muiTheme = useTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <List>
        <ListItem>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar src="/placeholder.svg" />
            <Box>
              <Typography variant="subtitle2" color="text.primary">
                My Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Boobindar pusia
              </Typography>
            </Box>
          </Box>
        </ListItem>
        {[ 
          { text: 'Dashboard', icon: <Dashboard /> },
          { text: 'My Documents', icon: <Description /> },
          { text: 'Personal Info', icon: <AccountTree /> },
          { text: 'Templates', icon: <Work /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        fullWidth
        sx={{ mx: 2, width: 'calc(100% - 32px)' }}
      >
       Log Out
      </Button>
    </Box>
  )

  const content = (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        mt: 8,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Data Import
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LinkedIn color="primary" />
                <Typography variant="h6" color="text.primary">LinkedIn Import</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Create a new resume quickly by importing your LinkedIn profile.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PictureAsPdf color="error" />
                <Typography variant="h6" color="text.primary">PDF Import</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Import your old PDF resume and give it a makeover.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Document Builders
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[ 
          { title: 'Resume Builder', description: 'Create and edit your resumes with AI help.' },
          { title: 'Cover Letter Builder', description: 'Create and edit your cover letters with AI help.' },
          { title: 'Website Builder', description: 'Turn your resume into a personal website with a single click.' },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Add />
                  <Typography variant="h6" color="text.primary">{item.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Resume Optimization
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Assessment />
                <Typography variant="h6" color="text.primary">Score Analysis</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graphics Box */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Performance Graph
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { name: 'Jan', value: 400 },
              { name: 'Feb', value: 500 },
              { name: 'Mar', value: 600 },
              { name: 'Apr', value: 700 },
              { name: 'May', value: 800 },
              { name: 'Jun', value: 900 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            bgcolor: 'background.paper',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="text.primary">
              Welcome back, Boobindar pusia!
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        {content}
      </Box>
    </ThemeProvider>
  )
}

export default DashboardPage
