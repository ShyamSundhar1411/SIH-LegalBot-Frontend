import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';


const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>
      <Card sx={{padding: '20px'}}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            Enter your credentials
          </Typography>
          <TextField type='text' name='username' value={username} onChange={(event) => setUsername(event.target.value)} label='Username' variant='filled' helperText={username === '' ? 'Please enter your username': ''} error={username === ''} />
          <TextField type='text' name='password' value={password} onChange={(event) => setPassword(event.target.value)} label='Password' variant='filled' helperText={password === '' ? 'Please enter your password': ''} error={password === ''} />
        </CardContent>
        <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
          <Button size="small" variant='contained'>Login</Button>
        </CardActions>
      </Card>
    </Box>
  );}

export default LoginPage