/* tslint:disable:jsx-no-lambda */
import './results.scss';
import React from 'react';
import { Button, Grid, Icon, Image, Item } from 'semantic-ui-react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { updateFilters } from 'app/modules/results/results.reducer';

export interface IResultsButtonColumnProps extends StateProps, DispatchProps {
  personal: boolean;
}

class ResultsButtonColumn extends React.Component<IResultsButtonColumnProps> {
  constructor(props) {
    super(props);
  }

  handleGenderButton = (gender: number) => {
    const { filters } = this.props;
    this.props.updateFilters({ ...filters, gender });
  };

  handlerAgeButton = (age: string) => {
    const { filters } = this.props;
    this.props.updateFilters({ ...filters, age });
  };

  share = action => {
    const left = (screen.width - 570) / 2;
    const top = (screen.height - 570) / 2;
    const params = 'menubar=no,toolbar=no,status=no,width=570,height=570,top=' + top + ',left=' + left;
    let url;
    switch (action) {
      case 'facebook':
        url = 'https://www.facebook.com/sharer.php?u=' + window.location.href;
        window.open(url, 'NewWindow', params);
        break;
      case 'twitter':
        url = 'https://twitter.com/intent/tweet?text=' + 'YouWho? έρευνα' + '&url=' + window.location.href;
        window.open(url, 'NewWindow', params);
        break;
      default:
        break;
    }
  };

  render() {
    const { personal, filters } = this.props;

    return (
      <Grid.Column computer={5} mobile={14} verticalAlign="middle">
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
          active={filters.gender === 2}
          onClick={() => this.handleGenderButton(2)}
          style={{ borderTopLeftRadius: '18px', borderBottomLeftRadius: '18px' }}
        >
          <Image src="content/images/female.svg" />
        </Button>
        <Button className="filter-buttons" active={filters.gender === 1} onClick={() => this.handleGenderButton(1)}>
          <Image className="filter-buttons-image" src="content/images/male.svg" />
        </Button>
        <Button
          className="filter-buttons"
          content="όλοι"
          active={!filters.gender}
          onClick={() => this.handleGenderButton(0)}
          style={{ borderTopRightRadius: '18px', borderBottomRightRadius: '18px', paddingTop: '22.2px' }}
        />
        <h3 className="filter-type">ηλικία</h3>
        <Button
          className="filter-buttons"
          content="17-20"
          active={filters.age === '17-20'}
          onClick={() => this.handlerAgeButton('17-20')}
          style={{ borderTopLeftRadius: '18px', borderBottomLeftRadius: '18px' }}
        />
        <Button
          className="filter-buttons"
          content="21-24"
          active={filters.age === '21-24'}
          onClick={() => this.handlerAgeButton('21-24')}
        />
        <Button
          className="filter-buttons"
          content="25-29"
          active={filters.age === '25-29'}
          onClick={() => this.handlerAgeButton('25-29')}
        />
        <Button
          className="filter-buttons"
          content="όλοι"
          active={!filters.age}
          onClick={() => this.handlerAgeButton(null)}
          style={{ borderTopRightRadius: '18px', borderBottomRightRadius: '18px' }}
        />
        <Button.Group style={{ display: 'block', marginTop: '10vh' }}>
          <h3 className="filter-type">Κάνε share</h3>
          <Button
            className="share-buttons"
            style={{ background: 'transparent', borderStyle: 'none' }}
            onClick={() => this.share('facebook')}
          >
            <Image src="content/images/share-facebook.svg" />
          </Button>
          <Button
            className="share-buttons"
            style={{ background: 'transparent', borderStyle: 'none' }}
            onClick={() => this.share('twitter')}
          >
            <Image src="content/images/share-twitter.svg" />
          </Button>
        </Button.Group>
        <Button.Group style={{ display: 'block', marginTop: '5vh' }}>
          <h3 className="filter-type">Ακολούθησέ μας στο:</h3>
          <iframe
            src={
              'https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FYouWho.gr' +
              '%2F&width=59&layout=button&action=like&size=small&share=false&height=65&appId'
            }
            width="59"
            height="65"
            style={{ border: 'none', overflow: 'hidden', paddingTop: '10px', marginLeft: '30px' }}
            scrolling="no"
            frameBorder="0"
            allowTransparency
            allow="encrypted-media"
          />
          <Button
            className="share-buttons"
            style={{ background: 'transparent', borderStyle: 'none' }}
            as="a"
            href="https://www.instagram.com/youwho.gr/"
            target="_blank"
          >
            <Image src="content/images/instagram-icon.png" style={{ width: '70px' }} />
          </Button>
        </Button.Group>
      </Grid.Column>
    );
  }
}

const mapStateToProps = ({ results }: IRootState) => ({
  filters: results.filters
});

const mapDispatchToProps = {
  updateFilters
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsButtonColumn);
