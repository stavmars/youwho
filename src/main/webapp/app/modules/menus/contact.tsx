import './contact.scss';
import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { showSidebar } from 'app/shared/reducers/header';
import { Button, Form, Grid, Comment } from 'semantic-ui-react';

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
    this.props.showSidebar();
  }

  render() {
    const { name, email, message } = this.props;

    return (
      <Grid className="contact-page" verticalAlign="middle">
        <Grid.Column width={5}>
          <h1 className="contact-page-title">Επικοινωνία</h1>
          <Form>
            <Form.Input className="contact-page-input" label="Ονοματεπώνυμο" value={name} />
            <Form.Input className="contact-page-input" label="Email" value={email} />
            <Form.TextArea className="contact-page-input" style={{ height: '200px' }} label="Μήνυμα" value={message} />
            <Button className="contact-page-submit" type="submit">
              Αποστολή
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={2} />
        <Grid.Column width={5}>
          <Comment.Group>
            <Comment className="comment">
              <Comment.Avatar src="/content/images/noun_Location_2641856.svg" />
              <Comment.Author className="comment-author" content="Εθνικό Κέντρο Κοινωνικών Ερευνών" />
              <Comment.Metadata className="comment-metadata" content="Κρατίνου 9 και Αθηνάς, Πλατεία Κοτζιά, 105 52 Αθήνα" />
            </Comment>
            <Comment className="comment">
              <Comment.Avatar src="/content/images/noun_call_2349137.svg" />
              <Comment.Metadata className="comment-metadata" content="210 7491600" />
            </Comment>
            <Comment className="comment">
              <Comment.Avatar src="/content/images/noun_fax_2577487.svg" />
              <Comment.Metadata className="comment-metadata" content="210 7489800" />
            </Comment>
          </Comment.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  isSidebarVisible: storeState.header.isSidebarVisible
});

const mapDispatchToProps = {
  showSidebar
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact);
