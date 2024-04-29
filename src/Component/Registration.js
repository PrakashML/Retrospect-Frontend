import React, { useState } from 'react';
import Header from './Header';
import Box from '@mui/material/Box';
import { Typography, RadioGroup, FormControlLabel, Radio, TextField, Button, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RetrospectService from '../Service/RetrospectService';

const Registration = () => {
  const [formValue, setformValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleRoleChange = (event) => {
    setformValue({ ...formValue, role: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (formValue.password !== formValue.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    const formData = {
      userName: formValue.name,
      userEmail: formValue.email,
      userPassword: formValue.password,
      userRole: formValue.role,
    };

    RetrospectService.register(formData)
      .then((response) => {
        console.log('response from backend', response.data);
        if (response.data === 'You have been signed up successfully') {
          window.alert('Registered Successfully');
        }
      })
      .catch((error) => {
        console.error('Error sending the data', error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformValue({ ...formValue, [name]: value });
    if (name === 'confirmPassword') {
      setPasswordMatch(formValue.password === value);
    }
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          backgroundColor="#f2f2f2"
          height={600}
          width={550}
          marginTop="2%"
          marginBottom="2%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
          borderRadius={1}
          sx={{ border: '1px solid white' }}
        >
          <Typography variant="h6" fontWeight="bold" color="#393e46" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Typography variant="subtitle1">Name</Typography>
            <TextField
              name="name"
              value={formValue.name}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Enter your name..."
              sx={{ marginBottom: '20px', '& input': { padding: '5px 35px' }, backgroundColor: 'white' }}
            />
            <Typography variant="subtitle1">Email</Typography>
            <TextField
              name="email"
              value={formValue.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Enter your email..."
              sx={{ marginBottom: '20px', '& input': { padding: '5px 35px' }, backgroundColor: 'white' }}
            />
            <Typography variant="subtitle1">Password</Typography>
            <TextField
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Enter your password..."
              sx={{ marginBottom: '20px', '& input': { padding: '5px 35px' }, backgroundColor: 'white' }}
            />
            <Typography variant="subtitle1">Confirm Password</Typography>
            <TextField
              type="password"
              name="confirmPassword"
              value={formValue.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="Confirm your password..."
              sx={{ marginBottom: '20px', '& input': { padding: '5px 35px' }, backgroundColor: 'white' }}
            />
            {!passwordMatch && (
              <Typography variant="body2" color="error" gutterBottom>
                Passwords do not match
              </Typography>
            )}
            <Typography variant="subtitle1">Role</Typography>
            <RadioGroup value={formValue.role} onChange={handleRoleChange} sx={{ marginBottom: '20px' }}>
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              <FormControlLabel value="user" control={<Radio />} label="User" />
            </RadioGroup>
            <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '20px' }}>
              Sign Up
            </Button>
          </form>
          <Box display="flex" justifyContent="left" marginBottom={4} marginTop={2} color={'grey'}>
            <span style={{ fontStyle: 'italic' }}> Already Have a Account : </span>
            <MuiLink component={RouterLink} to="/" color="primary" underline="none">
              Click Here
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Registration;


