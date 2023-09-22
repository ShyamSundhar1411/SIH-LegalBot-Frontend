import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const Disclaimer = () => {

  const [open, setOpen] = useState(false); 
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [locationError, setLocationError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  }

  const handlePincode = async () => {
    // pincode is not set
    if(pincode === ''){
      setOpen(true);
      return;
    }

    const PINCODE_API = 'https://api.postalpincode.in/pincode/';

    const responseJSON = await axios.get(PINCODE_API + pincode);
    const response = responseJSON.data[0];
    if(response['Status'] === 'Success'){
      setLocation(response['PostOffice'][0]['District']);
    }else{
      setPincode('');
      setLocationError(true);
    }
    setOpen(false);
  }

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Snackbar open={locationError} autoHideDuration={4000} onClose={() => setLocationError(false)} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={() => setLocationError(false)} severity="error" sx={{ width: '100%' }}>
          Invalid Pincode
        </Alert>
      </Snackbar>
      <Card variant='outlined' sx={{margin: '10px', width: 'min(900px, 30vw)'}}>
        <CardContent>
          <Typography>
            I'm a bot. I can assist you but I'm no way better than a human. You should always consider a professional's opinion before taking legal steps.
          </Typography>
          <Divider sx={{marginY: '20px'}}/>
          <Button variant='contained' onClick={handlePincode}>
            Contact professionals near you
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We need your approximate location to suggest a proffessional. Please enter your pincode
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="pincode"
                label="Pincode"
                type="number"
                fullWidth
                variant="standard"
                onChange={handlePincodeChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={handlePincode}>Submit</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card> 
    </Box>
  )
}

export default Disclaimer