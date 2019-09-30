import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import { IAnswer } from 'app/modules/chatbot/configure-steps';
// tslint:disable:jsx-no-lambda

export interface IAnswerProps {
  answer: IAnswer;
}

export class Answer extends React.Component<IAnswerProps> {
  render() {
    const { answer } = this.props;

    return (
      <div style={{ width: '100%' }}>
        <Button.Group>
          {/* TODO: Add store state to display/hide reset button. */}
          <Image
            src="/content/images/noun_Refresh_854003.svg"
            as={Button}
            className="reset"
            // @ts-ignore
            onClick={() => this.props.triggerNextStep({ trigger: answer.questionId })}
          />
          <Button disabled className="answer">
            <span>{answer.text}</span>
          </Button>
        </Button.Group>
      </div>
    );
  }
}

export default Answer;
