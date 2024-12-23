'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import { WorkOutline } from '@mui/icons-material';

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Signup successful!');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#000000', // Black background
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Main content */}
      <Container maxWidth="sm" sx={{ mx: 2 }}>
        <Card
          sx={{
            bgcolor: '#000000', // Black card
            color: '#ffffff', // White text
            border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 2,
                }}
              >
                <WorkOutline sx={{ color: '#ffffff' }} />
              </Box>
              <Typography
                variant="h4"
                component="h1"
                sx={{ mb: 1, fontWeight: 'bold', color: '#ffffff' }}
              >
                ResumeC
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 1, fontWeight: 'bold', color: '#ffffff' }}
              >
                Sign Up
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                Create your account
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                required
                sx={{ mb: 2 }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                InputProps={{
                  sx: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff', // White border
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff', // White on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff', // White on focus
                      },
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
                sx={{ mb: 2 }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                InputProps={{
                  sx: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff', // White border
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff', // White on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff', // White on focus
                      },
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                required
                sx={{ mb: 2 }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                InputProps={{
                  sx: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff', // White border
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff', // White on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff', // White on focus
                      },
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="College"
                variant="outlined"
                required
                sx={{ mb: 2 }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                InputProps={{
                  sx: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff', // White border
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff', // White on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff', // White on focus
                      },
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                type="tel"
                sx={{ mb: 3 }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                InputProps={{
                  sx: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff', // White border
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff', // White on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff', // White on focus
                      },
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                sx={{
                  bgcolor: '#ffffff',
                  color: '#000000',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default SignupPage;
