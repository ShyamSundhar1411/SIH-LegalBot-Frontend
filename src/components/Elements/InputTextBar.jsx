import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import { TextField, Select, MenuItem, /* FormControl, InputLabel */ } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import {Send, /* PictureAsPdf, */ } from '@mui/icons-material';

const InputTextBar = (props) => {
  const {showGenerateType, handleGenerateType, onChange, handleUpload} = props;
  const inputFileRef = useRef(null);
  const [value, setValue] = useState('select_type')

  const handleUploadButton = () => {
    inputFileRef.current.click();
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    handleGenerateType(event);
  }

  return (
    <TextField fullWidth placeholder='Enter your input' id="fullWidth"
    InputProps={{
      //REVIEW - Uncomment after backend can handle PDFs
      // startAdornment: (
        // <InputAdornment position='start'>
        //   <input type="file" name="upload-file" ref={inputFileRef} accept='.pdf' style={{display: 'none'}} onChange={handleUpload} />
        //   <Button variant='text' onClick={handleUploadButton}>
        //     <PictureAsPdf />
        //   </Button>
        // </InputAdornment>
      // ),
      startAdornment: (
        <InputAdornment>
          {showGenerateType && (
            <Select
              label="generate-type"
              value={value}
              onChange={handleChange}
              sx={{border: 'none', marginRight:'20px', marginLeft:'-15px'}}
            >
              <MenuItem value={'select_type'} disabled>Select Type</MenuItem>
              <MenuItem value={'anticipatory_bail'}>Anticipatory Bail</MenuItem>
              <MenuItem value={'divorce_petition'}>Divorce Petition</MenuItem>
              <MenuItem value={'family_settlement'}>Family Settlement</MenuItem>
              <MenuItem value={'lease_agreement'}>Lease Agreement</MenuItem>
              <MenuItem value={'name_change'}>Name Change</MenuItem>
              <MenuItem value={'pil'}>PIL</MenuItem>
              <MenuItem value={'property_sale'}>Property Sale</MenuItem>
              <MenuItem value={'RTI'}>RTI</MenuItem>
            </Select>
          )}
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <Button type="submit" variant="text">
            <Send/>
          </Button>
        </InputAdornment>
      ),
    }} 
    onChange={onChange}/>
  )
}

export default InputTextBar