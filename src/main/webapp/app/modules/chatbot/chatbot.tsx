import './chatbot.scss';

import React from 'react';
import ChatBot from 'react-simple-chatbot';
import ThemeProvider from 'styled-components';
import { configureStep } from 'app/modules/chatbot/configure-steps';
// tslint:disable:jsx-no-lambda

export interface IChatBotProps {
  survey: any;
}

export const YouWho = (props: IChatBotProps) => {
  const { survey } = props;
  const steps = configureStep(survey.questions);

  return <ChatBot steps={{ steps }} />;
  // return (
  //   <ThemeProvider
  //     theme={{
  //       background: '#777EFF',
  //       fontFamily: 'TTNormsProMedium',
  //       botBubbleColor: '#FFFFFF',
  //       botFontColor: '#777EFF',
  //       userBubbleColor: 'rgba(255, 255, 255, 0.65)',
  //       userFontColor: '#777EFF'
  //     }}
  //   >
  //     <SimpleChatBot
  //       hideUserAvatar
  //       botAvatar="/content/images/granny.png"
  //       footerStyle={{ display: 'none' }}
  //       headerComponent={
  //         <div style={{ height: '70px', backgroundColor: '#FFFFFF' }}>
  //           <img
  //             src="/content/images/MobileLogo.svg"
  //             alt="YouWho"
  //             style={{
  //               top: 0,
  //               position: 'fixed',
  //               margin: '20px 0 0 20px'
  //             }}
  //           />
  //           <img src="/content/images/dots.png" alt="Dots" style={{ float: 'right', margin: '25px 20px 0 0' }} />
  //         </div>
  //       }
  //       steps={steps}
  //       style={{
  //         height: '100vh',
  //         userSelect: 'none'
  //       }}
  //       contentStyle={{
  //         height: 'calc(100% - 70px )',
  //         width: window.innerWidth > 414 ? '380px' : '100%',
  //         marginLeft: window.innerWidth > 414 ? '40%' : '0'
  //       }}
  //       bubbleStyle={{
  //         userSelect: 'none'
  //       }}
  //       bubbleOptionStyle={{
  //         background: 'rgba(255, 255, 255, 0.65)'
  //       }}
  //       customStyle={{
  //         botBubbleColor: 'transparent'
  //       }}
  //       width="100%"
  //     />
  //   </ThemeProvider>
  // );
};

export default YouWho;
