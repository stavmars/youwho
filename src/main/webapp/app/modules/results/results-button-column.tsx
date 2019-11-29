/* tslint:disable:jsx-no-lambda */
import './results.scss';
import React from 'react';
import { Button, Grid, Icon, Image, Item } from 'semantic-ui-react';

export interface IResultsButtonColumnProps {
  personal: boolean;
}

export interface IResultsButtonColumnState {
  gender: number; // 0: no gender, 1: female, 2: male
  age: number; // 0: no age, 1: 17-20, 2: 21-24, 3: 25-29
}

export class ResultsButtonColumn extends React.Component<IResultsButtonColumnProps, IResultsButtonColumnState> {
  constructor(props) {
    super(props);
    this.state = {
      gender: 0,
      age: 0
    };
  }

  handleGenderButton = (num: number) => {
    this.setState({ ...this.state, gender: num });
  };

  handlerAgeButton = (num: number) => {
    this.setState({ ...this.state, age: this.state.age === num ? 0 : num });
  };

  render() {
    const { personal } = this.props;

    return (
      <Grid.Column computer={4} mobile={14} verticalAlign="middle">
        {personal && (
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header className="results-legend me">
                  <Icon name="circle" style={{ color: '#FF6666' }} />
                  {'\t'}εγώ
                </Item.Header>
              </Item.Content>
            </Item>
            <Item>
              <Item.Content>
                <Item.Header className="results-legend others">
                  <Icon name="circle" style={{ color: '#707070' }} />
                  {'\t'}σε σχέση με...
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        )}
        <h3 className="filter-type">φύλο</h3>
        <Button
          className="filter-buttons"
          active={this.state.gender === 1}
          onClick={() => this.handleGenderButton(1)}
          style={{ borderTopLeftRadius: '18px', borderBottomLeftRadius: '18px', height: '48px' }}
        >
          <Image src="content/images/female.svg" />
        </Button>
        <Button
          className="filter-buttons"
          active={this.state.gender === 2}
          onClick={() => this.handleGenderButton(2)}
          style={{ height: '48px' }}
        >
          <Image className="filter-buttons-image" src="content/images/male.svg" />
        </Button>
        <Button
          className="filter-buttons"
          content="όλοι"
          active={this.state.gender === 0}
          onClick={() => this.handleGenderButton(0)}
          style={{ borderTopRightRadius: '18px', borderBottomRightRadius: '18px', height: '48px', paddingTop: '21px' }}
        />
        <h3 className="filter-type">ηλικία</h3>
        <Button
          className="filter-buttons"
          content="17-20"
          active={this.state.age === 1}
          onClick={() => this.handlerAgeButton(1)}
          style={{ borderTopLeftRadius: '18px', borderBottomLeftRadius: '18px', height: '48px' }}
        />
        <Button
          className="filter-buttons"
          content="21-24"
          active={this.state.age === 2}
          onClick={() => this.handlerAgeButton(2)}
          style={{ height: '48px' }}
        />
        <Button
          className="filter-buttons"
          content="25-29"
          active={this.state.age === 3}
          onClick={() => this.handlerAgeButton(3)}
          style={{ borderTopRightRadius: '18px', borderBottomRightRadius: '18px', height: '48px' }}
        />
        <Button.Group style={{ display: 'block', marginTop: '10vh' }}>
          <h3 className="filter-type">Κάνε share</h3>
          <Button className="share-buttons" style={{ background: 'transparent', borderStyle: 'none' }}>
            <Image src="content/images/share-facebook.svg" />
          </Button>
          <Button className="share-buttons" style={{ background: 'transparent', borderStyle: 'none' }}>
            <Image src="content/images/share-twitter.svg" />
          </Button>
        </Button.Group>
      </Grid.Column>
    );
  }
}

export default ResultsButtonColumn;
