import './results-button.scss';
import React from 'react';
import { Button } from 'semantic-ui-react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class ResultsButton extends React.Component<StateProps> {
  render() {
    const { currentSurveyResponse } = this.props;

    return (
      <div>
        <Button className="results-button" as={Link} to={`/results/${currentSurveyResponse.id}`}>
          <p className="results-button-emoji">🚪🚶</p>
          <p className="results-button-text">Δες τα αποτελέσματα</p>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  currentSurveyResponse: storeState.chatBot.currentSurveyResponse
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  null
)(ResultsButton);
