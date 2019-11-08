import React from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react';
import { IAnswer } from 'app/modules/survey-chat/configure-steps';
import { IRootState } from 'app/shared/reducers';
import { updateLastQuestion } from 'app/modules/survey-chat/chatbot.reducer';
// tslint:disable:jsx-no-lambda

export interface IAnswerProps extends StateProps, DispatchProps {
  answer: IAnswer;
  reset: boolean;
}

export class Answer extends React.Component<IAnswerProps> {
  componentDidMount(): void {
    this.props.updateLastQuestion(this.props.answer.questionId);
  }

  render() {
    const { answer, reset, lastQuestionId } = this.props;

    return (
      <div style={{ width: '100%' }}>
        {lastQuestionId === answer.questionId && reset && (
          <Image
            src="content/images/noun_Refresh_854003.svg"
            as={Button}
            className="reset"
            // @ts-ignore
            onClick={() => this.props.triggerNextStep({ trigger: answer.questionId })}
          />
        )}
        <Button floated="right" className="answer">
          <span>{answer.text}</span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  lastQuestionId: storeState.chatBot.lastQuestionId
});

const mapDispatchToProps = {
  updateLastQuestion
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer);
