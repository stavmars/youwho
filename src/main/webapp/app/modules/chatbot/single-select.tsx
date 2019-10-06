import React from 'react';
import { Button } from 'semantic-ui-react';
import { IComponentProps, IOption } from 'app/modules/chatbot/configure-steps';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { addQuestionResponse, initiateQuestionTimer } from 'app/modules/chatbot/chatbot.reducer';
import moment from 'moment';
// tslint:disable:jsx-no-lambda

export interface ISingleSelectProps extends IComponentProps, StateProps, DispatchProps {}

export class SingleSelect extends React.Component<ISingleSelectProps> {
  componentDidMount(): void {
    this.props.initiateQuestionTimer();
  }

  commitChoice(option: IOption): void {
    this.props.addQuestionResponse({
      questionId: option.questionId,
      startTime: this.props.questionStartTime,
      endTime: moment(),
      choiceIds: [option.value]
    });
    // @ts-ignore
    this.props.triggerNextStep({ trigger: option.trigger });
  }

  render() {
    const { options } = this.props;

    return (
      <Button.Group className="single-select-buttons">
        {options.map(option => (
          <Button key={option.trigger} onClick={() => this.commitChoice(option)} className="single-select">
            {option.text}
          </Button>
        ))}
      </Button.Group>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  currentSurveyResponse: storeState.chatBot.currentSurveyResponse,
  questionStartTime: storeState.chatBot.questionStartTime
});

const mapDispatchToProps = {
  initiateQuestionTimer,
  addQuestionResponse
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleSelect);
