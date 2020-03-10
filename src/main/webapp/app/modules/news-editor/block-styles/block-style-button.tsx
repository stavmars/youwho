import React from 'react';
import { Button } from 'semantic-ui-react';

export interface IBlockStyleButtonProps {
  label: string;
  style: string;
  onToggle: any;
  active: boolean;
}

class BlockStyleButton extends React.Component<IBlockStyleButtonProps> {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    return <Button onMouseDown={this.onToggle} icon={this.props.label} active={this.props.active} />;
  }
}

export default BlockStyleButton;
