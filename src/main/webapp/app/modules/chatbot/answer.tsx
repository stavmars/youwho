import React from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react';
import { IAnswer } from 'app/modules/chatbot/configure-steps';
import { IRootState } from 'app/shared/reducers';
import { updateLastQuestion } from 'app/modules/chatbot/chatbot.reducer';
// tslint:disable:jsx-no-lambda

export interface IAnswerProps extends StateProps, DispatchProps {
  answer: IAnswer;
}

export class Answer extends React.Component<IAnswerProps> {
  componentDidMount(): void {
    this.props.updateLastQuestion(this.props.answer.questionId);
  }

  render() {
    const { answer, lastQuestionId } = this.props;

    return (
      <div style={{ width: '100%' }}>
        <Button.Group>
          {lastQuestionId === answer.questionId && (
            <Image
              src="/content/images/noun_Refresh_854003.svg"
              as={Button}
              className="reset"
              // @ts-ignore
              onClick={() => this.props.triggerNextStep({ trigger: answer.questionId })}
            />
          )}
          <Button disabled className="answer">
            <span>{answer.text}</span>
          </Button>
        </Button.Group>
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
