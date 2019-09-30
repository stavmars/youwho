import React from 'react';
import { Button } from 'semantic-ui-react';
import { IComponentProps } from 'app/modules/chatbot/configure-steps';
// tslint:disable:jsx-no-lambda

export interface ISingleSelectProps extends IComponentProps {}

export class SingleSelect extends React.Component<ISingleSelectProps> {
  render() {
    return (
      <Button.Group className="single-select-buttons">
        {this.props.options.map(option => (
          <Button
            key={option.trigger}
            // @ts-ignore
            onClick={() => this.props.triggerNextStep({ trigger: option.trigger })}
            className="single-select"
          >
            {option.text}
          </Button>
        ))}
      </Button.Group>
    );
  }
}

export default SingleSelect;
