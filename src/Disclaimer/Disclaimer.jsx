import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, DialogActions } from '@mui/material';

const Disclaimer = () => {

  const [open, setOpen] = useState(false); 
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            // prompts users
            setOpen(true);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            setOpen(true);
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }

  const handleClick = () => {
    getLocation();
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
    console.log(pincode);
  }

  const handlePinCode = () => {
    // TODO: get location from pincode 
  }


  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Card variant='outlined' sx={{margin: '10px', width: 'min(900px, 30vw)'}}>
        <CardContent>
          <Typography>
            I'm a bot. I can assist you but I'm no way better than a human. You should always consider a professional's opinion before taking legal steps.
          </Typography>
          <Divider sx={{marginY: '20px'}}/>
          <Button variant='contained' onClick={handleClick}>
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
              <Button onClick={handlePinCode}>Submit</Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card> 
    </Box>
  )
}

export default Disclaimer