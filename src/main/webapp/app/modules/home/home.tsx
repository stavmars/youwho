import './home.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ChatBot } from 'app/modules/chatbot/chatbot';
import { IRootState } from 'app/shared/reducers';
import _ from 'lodash';

export type IHomeProp = StateProps;

export class Home extends React.Component<IHomeProp> {
  render() {
    const { surveysByName } = this.props;

    if (_.isEmpty(surveysByName)) {
      return null;
    } else {
      const youWhoSurvey = surveysByName['youWho'];

      return (
        <div>
          <h1>{youWhoSurvey.name}</h1>
          <p>{youWhoSurvey.description}</p>
          <ChatBot survey={youWhoSurvey} />
        </div>
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
