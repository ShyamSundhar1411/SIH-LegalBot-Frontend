import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { PictureAsPdf, Send } from '@mui/icons-material';

const InputTextBar = (props) => {
  const {onChange, handleUpload, handleSubmit} = props;
  const inputFileRef = useRef(null);

  const handleUploadButton = () => {
    inputFileRef.current.click();
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
      endAdornment: (
        <InputAdornment position="end">
          <Button variant="text" onClick={handleSubmit}>
            <Send/>
          </Button>
        </InputAdornment>
      ),
    }} 
    onChange={onChange}/>
  )
}

export default InputTextBar