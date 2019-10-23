import React from 'react';
import { IAnswer } from 'app/modules/chatbot/configure-steps';
import Answer from 'app/modules/chatbot/answer';
import { Grid } from 'semantic-ui-react';
// tslint:disable:jsx-no-lambda

export interface IMultiAnswerProps {
  answer: IAnswer;
}

export interface IMultiAnswerState {
  choices: any;
}

export class MultiAnswer extends React.Component<IMultiAnswerProps, IMultiAnswerState> {
  constructor(props) {
    super(props);
    this.state = {
      choices: []
    };
  }

  componentDidMount() {
    // @ts-ignore
    this.setState({ choices: this.props.steps['option_' + this.props.answer.questionId].value });
  }

  render() {
    const { choices } = this.state;
    const { answer } = this.props;

    return choices.map((choice, index) => (
      <Answer
        reset={false}
        answer={{
          ...answer,
          text: choice.description ? choice.description : choice.text
        }}
        key={`multi_answer_${index}`}
      />
    ));
  }
}

export default MultiAnswer;
