import './contact.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Button, Form, Grid, Comment } from 'semantic-ui-react';

const contactInfo = () => (
  <Comment.Group>
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

export interface IContactProps extends StateProps, DispatchProps {
  name: string;
  email: string;
  message: string;
}

export class Contact extends React.Component<IContactProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.hideSidebar();
  }

  render() {
    const { name, email, message } = this.props;

    return (
      <div>
        <Grid className="contact-page" verticalAlign="middle">
          <Grid.Column computer={7} mobile={16}>
            <h1 className="contact-page-title">Επικοινωνία</h1>
            {/*{contactForm(name, email, message)}*/}
            <p className="contact-page-paragraph">
              Στείλε μας τα σχόλιά σου στο <a href="mailto:youwho@ekke.gr?subject=Σχόλια%20Έρευνας">youwho@ekke.gr</a>
            </p>
          </Grid.Column>
          <Grid.Column computer={5} mobile={16}>
            {contactInfo()}
          </Grid.Column>
        </Grid>
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
