import './chatbot.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { defaultValue } from 'app/shared/model/survey.model';
import { initiateSurveyResponse, storeSurveyResponse } from 'app/modules/survey-chat/chatbot.reducer';
import ChatBot from 'react-simple-chatbot';
import ProgressBar from 'app/modules/survey-chat/progress-bar';
import { ThemeProvider } from 'styled-components';
import { configureStep } from 'app/modules/survey-chat/configure-steps';
import { Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export interface IChatBotProps extends StateProps, DispatchProps {}
export class SurveyChat extends React.Component<IChatBotProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initiateSurveyResponse(moment());
  }

  // componentDidUpdate(prevProps: Readonly<IChatBotProps>) {
  //   if (this.props.survey !== prevProps.survey) {
  //     this.props.initiateSurveyResponse(moment());
  //   }
  // }

  render() {
    const { survey, activeCategory, loading } = this.props;
    const scenario = Math.floor(Math.random() * 2);

    return loading || survey === defaultValue ? (
      <Dimmer active page>
        <Loader />
      </Dimmer>
    ) : (
      <div style={{ width: '100%', backgroundColor: '#6065CC' }}>
        <ProgressBar activeCategory={activeCategory} categories={survey.topics[scenario]} />
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
            botAvatar="content/images/granny.jpg"
            footerStyle={{ display: 'none' }}
            hideHeader
            handleEnd={() => this.props.storeSurveyResponse(survey)}
            steps={configureStep(survey.questions, scenario)}
            style={{
              height: 'calc(100vh - 132px)',
              userSelect: 'none',
              borderRadius: '0px',
              width: window.innerWidth > 414 ? '600px' : '100%',
              marginLeft: window.innerWidth > 414 ? '30%' : '0'
            }}
            contentStyle={{
              height: window.innerWidth > 414 ? '70%' : '100%'
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
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  survey: storeState.survey.entity,
  loading: storeState.survey.loading,
  activeCategory: storeState.chatBot.activeCategory
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
