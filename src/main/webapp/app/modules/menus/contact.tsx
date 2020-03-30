import './contact.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { hideSidebar } from 'app/shared/reducers/header';
import { Button, Form, Grid, Comment, Popup } from 'semantic-ui-react';
import { sendContactMail } from 'app/entities/survey/survey.reducer';

export interface IContactProps extends StateProps, DispatchProps {}

const initialState = {
  name: '',
  email: '',
  content: ''
};

export interface IContactState {
  name: string;
  email: string;
  content: string;
}

export class Contact extends React.Component<IContactProps, IContactState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.props.hideSidebar();
  }

  contactInfo() {
    return (
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
  }

  validateEmail = () => {
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !this.state.email.match(mailFormat);
  };

  handleChange = (e, { name, value }) => this.setState({ ...this.state, [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.sendContactMail(this.state.name, this.state.email, this.state.content);
    this.setState(initialState);
  };

  contactForm(name: string, email: string, content: string) {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          className="contact-page-input"
          label="Ονοματεπώνυμο"
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          required
        />
        <Form.Input
          className="contact-page-input"
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
          error={
            this.validateEmail() &&
            email !== '' && {
              content: 'Please enter a valid email address',
              pointing: 'below'
            }
          }
          required
        />
        <Form.TextArea
          className="contact-page-input"
          style={{ height: '200px' }}
          label="Μήνυμα"
          type="text"
          name="content"
          value={content}
          onChange={this.handleChange}
          required
        />
        <Popup
          open={this.props.contactMailSent}
          content={this.props.successMessage}
          position="top center"
          trigger={
            <Button
              className="contact-page-submit"
              type="submit"
              disabled={this.state.content === '' || this.state.email === '' || this.state.name === '' || this.validateEmail()}
            >
              Αποστολή
            </Button>
          }
        />
      </Form>
    );
  }

  render() {
    return (
      <div>
        <Grid stackable className="contact-page" verticalAlign="middle" centered columns={4}>
          <Grid.Row style={{ marginTop: '20px' }}>
            <h1 className="contact-page-title">Επικοινωνία</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column only="mobile">{this.contactInfo()}</Grid.Column>
            <Grid.Column>{this.contactForm(this.state.name, this.state.email, this.state.content)}</Grid.Column>
            <Grid.Column only="computer">{this.contactInfo()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isSidebarVisible: storeState.header.isSidebarVisible,
  successMessage: storeState.survey.successMessage,
  contactMailSent: storeState.survey.contactMailSent
});

const mapDispatchToProps = {
  hideSidebar,
  sendContactMail
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
