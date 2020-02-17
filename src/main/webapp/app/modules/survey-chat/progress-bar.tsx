import './progress-bar.scss';
import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

export interface IProgressBarProps {
  activeCategory: string;
  categories: string[];
  scenario: number;
}

export class ProgressBar extends React.Component<IProgressBarProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { activeCategory, categories, scenario } = this.props;
    return (
      <div className="progress">
        <div className="progress-line" />
        <Grid className="progress-bar">
          <Grid.Row>
            {categories.map((value, index) => (
              <Grid.Column
                className={`progress-name ${categories.indexOf(activeCategory) === index ? 'active' : ''} name-${index} sc-${scenario}`}
              >
                <Icon name="circle" className={`progress-dot ${categories.indexOf(activeCategory) >= index ? 'active' : ''}`} />
                <br />
                <span>{value}</span>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default ProgressBar;
