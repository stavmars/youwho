import './contact.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Button, Form, Grid, Comment, Responsive, Icon } from 'semantic-ui-react';

const contactInfo = () => (
  <Comment.Group>
    <Comment className="comment">
      <Comment.Avatar as={Icon} name="mail" size="big" style={{ marginLeft: '-16px', color: '#f66' }} />
      <Comment.Author className="comment-author">
        <a href="mailto:youwho@ekke.gr?subject=Σχόλια%20Έρευνας" style={{ color: '#401b00', marginLeft: '-10px' }}>
          youwho@ekke.gr
        </a>
      </Comment.Author>
    </Comment>
    <Comment className="comment">
      <Comment.Avatar src="content/images/noun_Location_2641856.svg" style={{ width: '25px', height: '33px', margin: '5px' }} />
      <Comment.Author className="comment-author" content="Εθνικό Κέντρο Κοινωνικών Ερευνών" />
      <Comment.Metadata className="comment-metadata" content="Κρατίνου 9 και Αθηνάς, Πλατεία Κοτζιά, 105 52 Αθήνα" />
    </Comment>
    <Comment className="comment">
      <Comment.Avatar src="content/images/noun_call_2349137.svg" style={{ width: '25px', height: '33px', margin: '5px' }} />
      <Comment.Metadata className="comment-metadata" content="210 7491613-614" />
    </Comment>
  </Comment.Group>
);

const contactForm = (name: string, email: string, message: string) => (
  <Form>
    <Form.Input className="contact-page-input" label="Ονοματεπώνυμο" value={name} />
    <Form.Input className="contact-page-input" label="Email" value={email} />
    <Form.TextArea className="contact-page-input" style={{ height: '200px' }} label="Μήνυμα" value={message} />
    <Button className="contact-page-submit" type="submit">
      Αποστολή
    </Button>
  </Form>
);

export interface IContactProps extends StateProps, DispatchProps {}

export class Contact extends React.Component<IContactProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.hideSidebar();
  }

  render() {
    return (
      <div>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Grid className="contact-page" verticalAlign="middle" centered columns={4}>
            <Grid.Column>
              <h1 className="contact-page-title">Επικοινωνία</h1>
              {contactInfo()}
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <Grid className="contact-page" verticalAlign="middle">
            <Grid.Column>
              <h1 className="contact-page-title">Επικοινωνία</h1>
              {contactInfo()}
            </Grid.Column>
          </Grid>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isSidebarVisible: storeState.header.isSidebarVisible
});

const mapDispatchToProps = {
  hideSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
