import React from 'react';

export const BLOCK_TYPES = [
  { label: 'quote left', style: 'blockquote' },
  { label: 'unordered list', style: 'unordered-list-item' },
  { label: 'ordered list', style: 'ordered-list-item' },
  { label: 'code', style: 'code-block' }
];
export const HEADER_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' }
];

export interface IHeaderStyleDropdownProps {
  headerOptions: Array<{ label: string; style: string }>;
  onToggle: any;
  active: string;
}

class HeaderStyleDropdown extends React.Component<IHeaderStyleDropdownProps> {
  onToggle = event => {
    const value = event.target.value;
    this.props.onToggle(value);
  };

  render() {
    return (
      <select value={this.props.active} onChange={this.onToggle}>
        <option value="">Header Levels</option>
        {this.props.headerOptions.map(heading => (
          <option value={heading.style}>{heading.label}</option>
        ))}
      </select>
    );
  }
}

export default HeaderStyleDropdown;
