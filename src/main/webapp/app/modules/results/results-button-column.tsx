import './results.scss';
import React from 'react';
import { Button, Grid, Icon, Image, Item } from 'semantic-ui-react';

export interface IResultsButtonColumnProps {
  personal: boolean;
}

const ResultsButtonColumn = (props: IResultsButtonColumnProps) => (
  <Grid.Column computer={4} mobile={14} verticalAlign="middle">
    {props.personal && (
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
    <Button.Group style={{ display: 'block' }}>
      <h3 className="filter-type">φύλο</h3>
      <Button className="filter-buttons" style={{ borderTopLeftRadius: '18px', borderBottomLeftRadius: '18px', height: '48px' }}>
        <Image src="content/images/female.svg" />
      </Button>
      <Button className="filter-buttons" style={{ height: '48px' }}>
        <Image src="content/images/male.svg" />
      </Button>
      <Button
        className="filter-buttons"
        content="όλοι"
        style={{ borderTopRightRadius: '18px', borderBottomRightRadius: '18px', height: '48px', paddingTop: '24px' }}
      />
    </Button.Group>
    <Button.Group style={{ display: 'block' }}>
      <h3 className="filter-type">ηλικία</h3>
      <Button
        className="filter-buttons"
        content="17-20"
        style={{ borderTopLeftRadius: '18px', borderBottomLeftRadius: '18px', height: '48px' }}
      />
      <Button className="filter-buttons" content="21-24" style={{ height: '48px' }} />
      <Button
        className="filter-buttons"
        content="25-28"
        style={{ borderTopRightRadius: '18px', borderBottomRightRadius: '18px', height: '48px' }}
      />
    </Button.Group>
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

export default ResultsButtonColumn;
