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

function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const toggleAuthPage = () => {
    setIsLogin(!isLogin); // Toggle between Login and Sign Up
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
         <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          bottom: 0,
                          width: 300,
                          height: 300,
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: '50%',
                            }}
                          />
                        </Box>
                      </Box>
                
                      {/* Right decoration */}
                      <Box
                        sx={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          width: 300,
                          height: 300,
                        }}
                      >
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              borderRadius: '50%',
                            }}
                          />
                        </Box>
                      </Box>
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
                {isLogin ? 'Log In' : 'Sign Up'}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
              >
                {isLogin
                  ? 'Get started with your resume'
                  : 'Create an account to start'}
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {!isLogin && (
                <>
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
                            borderColor: '#ffffff',
                          },
                          '&:hover fieldset': {
                            borderColor: '#ffffff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ffffff',
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
                            borderColor: '#ffffff',
                          },
                          '&:hover fieldset': {
                            borderColor: '#ffffff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ffffff',
                          },
                        },
                      },
                    }}
                  />
                </>
              )}
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
                        borderColor: '#ffffff',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff',
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
                sx={{ mb: 3 }}
                InputLabelProps={{
                  sx: { color: 'rgba(255, 255, 255, 0.7)' },
                }}
                InputProps={{
                  sx: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ffffff',
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
                ) : isLogin ? (
                  'Log in'
                ) : (
                  'Sign up'
                )}
              </Button>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                variant="text"
                onClick={toggleAuthPage}
                sx={{
                  color: '#ffffff',
                  textTransform: 'none',
                  '&:hover': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Log In'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AuthPage;
