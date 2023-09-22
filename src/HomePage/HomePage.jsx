import React from 'react';
import { Container } from '@mui/material';
import NavBar from '../NavBar/NavBar';
import ChatBox from '../ChatBox/ChatBox';
import Disclaimer from '../Disclaimer/Disclaimer';

export default function HomePage() {
    return ( 
    <Container maxWidth={true} style={{padding: 0}}>
        <NavBar/>
        <ChatBox />
        <Disclaimer />
    </Container>
    )
}