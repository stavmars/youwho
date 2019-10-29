import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import SurveyChat from 'app/modules/chatbot/chatbot';
import _ from 'lodash';
import { initiateSurveyResponse, storeSurveyResponse } from 'app/modules/chatbot/chatbot.reducer';
// tslint:disable:jsx-no-lambda

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  render() {
    const { surveysByName } = this.props;

    if (_.isEmpty(surveysByName)) {
      return null;
    } else {
      const youWhoSurvey = surveysByName['youWho'];

      return (
        <SurveyChat
          survey={youWhoSurvey}
          initiateSurveyResponse={this.props.initiateSurveyResponse}
          storeSurveyResponse={this.props.storeSurveyResponse}
        />
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
