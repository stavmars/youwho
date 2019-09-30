import './home.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ChatBot } from 'app/modules/chatbot/chatbot';
import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export class Home extends React.Component<IHomeProp> {
  render() {
    const { surveysByName } = this.props;
    const youWhoSurvey = surveysByName['youWho'];
    console.log(youWhoSurvey);

    return (
      <div>
        <h1>{youWhoSurvey && youWhoSurvey.name}</h1>
        <p>{youWhoSurvey && youWhoSurvey.description}</p>
        <ChatBot survey={youWhoSurvey && youWhoSurvey} />
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  surveysByName: storeState.survey.entitiesByName
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
