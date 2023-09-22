import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

export default function Message(props) {
  
  const {message} = props;
  const {type, content} = message;
  const isBot = type === 'bot';

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          paddingX: 2,
          paddingY: 1,
          backgroundColor: isBot ? "#3570e6" : "#b135e6",
        }}
      >
        <Typography variant="body1">{content}</Typography>
      </Paper>
    </Box>
  )
}