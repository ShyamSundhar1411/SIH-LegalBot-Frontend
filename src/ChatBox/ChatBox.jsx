import { Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import Message from '../Message/Message';
import InputTypeSelection from '../InputTypeSelection/InputTypeSelection';
import InputTextBar from '../InputTextBar/InputTextBar';
import { SyncLoader } from 'react-spinners';
import { grey } from '@mui/material/colors';

export default function ChatBox() {

  const [messages, setMessages] = useState([]);
  const [inputType, setInputType] = useState(0);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadNotifcation, setUploadNotification] = useState(false);
  const [generateType, setGenerateType] = useState('select_type');
  const [selectType, setSelectType] = useState(false);

  const fetchMessages = () => {
    // TODO: API call to backend to fetch messages
    // dummy data for now
    const data = [
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm your legal assistant"
      },
      {
        id: 2,
        type: 'user',
        content: "Hey. Can you help me with my docs?"
      }
    ];
    setMessages(data);
  };

  const handleInputType = (event, nextValue) => {
    setInputType(nextValue);
  };

  const handleUpload = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    handleSubmit();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    
    if(file != null){
      formData.append('file', file);
    }

    formData.append('text', text);
    let finalType = '';
    if(inputType === 0){
      if(generateType !== 'select_type'){
        finalType = 'generate';
        formData.append('document_class', generateType);
      }else{
        setSelectType(true);
      }
    }else if(inputType === 1){
      finalType = 'simplify';
    }else{
      finalType = 'query';
    }

    formData.append('type', finalType);
    
    // TODO: send the data to the backend and update state accordingly
    for(const data of formData.values()){
      console.log(data);
    }
    setUploadNotification(true);
  };

  const handleGenerateType = (event) => {
    if(event.target.value !== 'select_type'){
      setGenerateType(event.target.value);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const scrollStyles = {
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
      borderRadius: '5px'
    }  
  }

  return (
    <Box sx={{display:'flex',flexDirection: 'column', alignItems: 'center'}}>
      <Snackbar open={uploadNotifcation} autoHideDuration={6000} onClose={() => setUploadNotification(false)} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={() => setUploadNotification(false)} severity="success" sx={{ width: '100%' }}>
          Your file has been uploaded!
        </Alert>
      </Snackbar>
      <Snackbar open={selectType} autoHideDuration={4000} onClose={() => setSelectType(false)} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={() => setSelectType(false)} severity="error" sx={{ width: '100%' }}>
          Please select a document type
        </Alert>
      </Snackbar>
      <Paper elevation={0} sx={{padding: '20px 40px', margin: '0 40px', width: 'max(80vw, 1000px)'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', padding: '0 5px', maxHeight: '40vh', overflowY: 'scroll', ...scrollStyles}}>
          {messages.map(message => {
            return <Message key={message.id} message={message} />;
          })}
          {loading && <Message message={{
            type: 'bot',
            content: <SyncLoader size={6} color={grey[50]} />
            }}></Message>}
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0'}}>
          <InputTypeSelection value={inputType} handleChange={handleInputType}></InputTypeSelection>
        </Box>
        <form onSubmit={handleSubmit}>
          <InputTextBar 
            value={text}
            showGenerateType={inputType === 0}
            handleGenerateType={handleGenerateType}
            handleUpload={handleUpload} onChange={(event) => setText(event.target.value)}
            handleSubmit={handleSubmit}
          >
          </InputTextBar>
        </form>
      </Paper>
    </Box>
  );
}
