import { Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import Message from '../Message/Message';
import InputTypeSelection from '../InputTypeSelection/InputTypeSelection';
import InputTextBar from '../InputTextBar/InputTextBar';
import { SyncLoader } from 'react-spinners';
import { grey } from '@mui/material/colors';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function ChatBox() {

  const [messages, setMessages] = useState([]);
  const [inputType, setInputType] = useState(0);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadNotifcation, setUploadNotification] = useState(false);
  const [generateType, setGenerateType] = useState('select_type');
  const [selectType, setSelectType] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [firstGenerate, setFirstGenerate] = useState(true);

  const fetchMessages = () => {
    // TODO: API call to backend to fetch messages
    // dummy data for now
    const data = [
      {
        id: 1,
        type: 'bot',
        content: "Hello! I'm your legal assistant"
      },
      // {
      //   id: 2,
      //   type: 'user',
      //   content: "Hey. Can you help me with my docs?"
      // }
    ];
    setMessages(data);
  };

  const firstGeneratePrompt = async () => {
    const URL = 'http://localhost:5000/process';
    let json = {};
    json['prompt'] = '';
    json['class'] = 'generate';
    json['document_class'] = generateType;
    
    console.log("First prompt of type " + generateType);
    
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json),
      mode: 'cors'
    });
    setFirstGenerate(prev => false);
    
    console.log(response);
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
    setMessages(prev => [...prev, {
      id: uuidv4(),
      type: 'user',
      content: text
    }]);
    let formData = new FormData();
    let json = {};
    
    if(file != null){
      formData.append('file', file);
    }

    formData.append('prompt', text);
    json['prompt'] = text;
    let finalType = '';
    if(inputType === 0){
      if(generateType === 'select_type'){
        setSelectType(true);
        return;
      }
      finalType = 'generate';
      formData.append('document_class', generateType);
      json['document_class'] = generateType;
    }else if(inputType === 1){
      finalType = 'simplify';
    }else{
      finalType = 'query';
    }

    formData.append('class', finalType);
    json['class'] = finalType;
    
    if(finalType === 'generate'){
      if(firstGenerate){
        await firstGeneratePrompt();
      }
    }else{
      setFirstGenerate(true);
    }

    setLoading(true);

    const URL = 'http://localhost:5000/process';

    try{
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
      })
      
      if(response['status'] !== 200){
        setMessageError(true);
        setLoading(false);
        return;
      }
      let responseJSON = await response.json();
      console.log(responseJSON);
      let message = {
        id: uuidv4(),
        type: 'bot',
        content: responseJSON['response']
      }
      setMessages(prev => [...prev, message]);
    }catch(err){
      console.log(err);
      setLoading(false);
      setMessageError(true);
    }

    setLoading(false);
    
  };

  const handleGenerateType = (event) => {
    if(event.target.value !== 'select_type'){
      setGenerateType(event.target.value);
      setFirstGenerate(true);
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
      <Snackbar open={uploadNotifcation} autoHideDuration={3000} onClose={() => setUploadNotification(false)} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={() => setUploadNotification(false)} severity="success" sx={{ width: '100%' }}>
          Your file has been uploaded!
        </Alert>
      </Snackbar>
      <Snackbar open={selectType} autoHideDuration={3000} onClose={() => setSelectType(false)} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={() => setSelectType(false)} severity="error" sx={{ width: '100%' }}>
          Please select a document type
        </Alert>
      </Snackbar>
      <Snackbar open={messageError} autoHideDuration={3000} onClose={() => setMessageError(false)} anchorOrigin={{vertical:'top', horizontal:'center'}}>
        <Alert onClose={() => setMessageError(false)} severity="error" sx={{ width: '100%' }}>
          Failed to send the message. Try again!
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
