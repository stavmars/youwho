import React from 'react';
import { Button } from 'semantic-ui-react';
import { IAnswer } from 'app/modules/chatbot/configure-steps';
// tslint:disable:jsx-no-lambda

export interface IMultiAnswerProps {
  answer: IAnswer;
}

export class MultiAnswer extends React.Component<IMultiAnswerProps> {
  render() {
    return <Button />;
  }
}

export default MultiAnswer;
