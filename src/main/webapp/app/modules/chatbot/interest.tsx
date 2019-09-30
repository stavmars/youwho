import React from 'react';
import { Button } from 'semantic-ui-react';
import { IComponentProps } from 'app/modules/chatbot/configure-steps';
// tslint:disable:jsx-no-lambda

export interface IInterestProps extends IComponentProps {}

export class Interest extends React.Component<IInterestProps> {
  render() {
    const { options } = this.props;

    return (
      <div style={{ width: '100%', alignContent: 'center' }}>
        <Button.Group className="interest-buttons">
          {options.map((option, index) => (
            <Button
              className={`interest-button opt${index}`}
              key={option.trigger}
              content={option.text}
              // @ts-ignore
              onClick={() => this.props.triggerNextStep({ trigger: option.trigger })}
            />
          ))}
        </Button.Group>
        <div className="interest-tooltip">
          {options.map(option => (
            <span className="interest-tooltip-text" key={option.trigger}>
              {option.description}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default Interest;
