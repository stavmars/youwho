import './home.scss';
import './chatbot.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import YouWho from 'app/modules/chatbot/chatbot';
import { IRootState } from 'app/shared/reducers';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { configureStep } from 'app/modules/chatbot/configure-steps';
import _ from 'lodash';

export type IHomeProp = StateProps;

export class Home extends React.Component<IHomeProp> {
  render() {
    const { surveysByName } = this.props;

    if (_.isEmpty(surveysByName)) {
      return null;
    } else {
      const youWhoSurvey = surveysByName['youWho'];
      const steps = configureStep(youWhoSurvey.questions);

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
            botAvatar="/content/images/granny.png"
            footerStyle={{ display: 'none' }}
            headerComponent={
              <div style={{ height: '70px', backgroundColor: '#FFFFFF' }}>
                <img
                  src="/content/images/MobileLogo.svg"
                  alt="YouWho"
                  style={{
                    top: 0,
                    position: 'fixed',
                    margin: '20px 0 0 20px'
                  }}
                />
                <img src="/content/images/dots.png" alt="Dots" style={{ float: 'right', margin: '25px 20px 0 0' }} />
              </div>
            }
            steps={steps}
            style={{
              height: '100vh',
              userSelect: 'none'
            }}
            contentStyle={{
              height: 'calc(100% - 70px )',
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
    }
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  surveysByName: storeState.survey.entitiesByName
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
