import './chatbot.scss';

import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { configureStep } from 'app/modules/chatbot/configure-steps';
import { ISurvey } from 'app/shared/model/survey.model';
import moment, { Moment } from 'moment';
// tslint:disable:jsx-no-lambda

export interface IChatBotProps {
  survey: ISurvey;
  storeSurveyResponse(): void;
  initiateSurveyResponse(survey: ISurvey, moment: Moment): void;
}

export const SurveyChat = (props: IChatBotProps) => {
  const { survey } = props;
  props.initiateSurveyResponse(survey, moment());
  const steps = configureStep(survey.questions);

  return (
    <ThemeProvider
      theme={{
        background: '#777EFF',
        fontFamily: 'TTNormsProMedium',
        botBubbleColor: '#FFFFFF',
        botFontColor: '#777EFF',
        userBubbleColor: 'rgba(255, 255, 255, 0.65)',
        userFontColor: '#777EFF'
      }}
    >
      <ChatBot
        hideUserAvatar
        botAvatar="content/images/granny.png"
        footerStyle={{ display: 'none' }}
        hideHeader
        handleEnd={() => props.storeSurveyResponse()}
        steps={steps}
        style={{
          height: 'calc(100vh - 80px)',
          userSelect: 'none',
          borderRadius: '0px'
        }}
        contentStyle={{
          height: window.innerWidth > 414 ? '70%' : '100%',
          width: window.innerWidth > 414 ? '380px' : '100%',
          marginLeft: window.innerWidth > 414 ? '40%' : '0'
        }}
        bubbleStyle={{
          userSelect: 'none'
        }}
        bubbleOptionStyle={{
          background: 'rgba(255, 255, 255, 0.65)'
        }}
        customStyle={{
          botBubbleColor: 'transparent'
        }}
        width="100%"
      />
    </ThemeProvider>
  );
};

export default SurveyChat;
