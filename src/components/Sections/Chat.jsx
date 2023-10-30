import React from "react";
import styled from "styled-components";
// Components
import ChatBox from "../Elements/ChatBox";

export default function Chat() {
  return (
    <Wrapper id="chat">
      <div className="whiteBg" style={{ padding: "60px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Get your legals sorted!</h1>
            <p className="font13">
              This is an LLM and not a real person or professional. We recommend you to contact professionals before you take any legal steps. 
            </p>
          </HeaderInfo>
          <ChatBox sx={{minHeight: ''}} />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;
const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;