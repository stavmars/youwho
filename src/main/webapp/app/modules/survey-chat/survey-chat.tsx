import './chatbot.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { initiateSurveyResponse, storeSurveyResponse } from 'app/modules/survey-chat/chatbot.reducer';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { configureStep } from 'app/modules/survey-chat/configure-steps';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export interface IChatBotProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export class SurveyChat extends React.Component<IChatBotProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { surveysByName } = this.props;
    const survey = surveysByName[this.props.match.params.id];
    if (survey) {
      this.props.initiateSurveyResponse(survey, moment());
    }
  }

  render() {
    const { surveysByName } = this.props;
    const survey = surveysByName[this.props.match.params.id];
    if (!survey) {
      return <Redirect to="/" />;
    }
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

const mapStateToProps = (storeState: IRootState) => ({
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
)(SurveyChat);
