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
import { initiateSurveyResponse, storeSurveyResponse } from 'app/modules/chatbot/chatbot.reducer';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  render() {
    const { surveysByName } = this.props;

    if (_.isEmpty(surveysByName)) {
      return null;
    } else {
      const youWhoSurvey = surveysByName['youWho'];
      this.props.initiateSurveyResponse(youWhoSurvey, moment());
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
            botAvatar="content/images/granny.png"
            footerStyle={{ display: 'none' }}
            hideHeader
            handleEnd={() => this.props.storeSurveyResponse()}
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
    }
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  surveysByName: storeState.survey.entitiesByName
});

const mapDispatchToProps = {
  initiateSurveyResponse,
  storeSurveyResponse
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
