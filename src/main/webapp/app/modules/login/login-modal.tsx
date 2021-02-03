import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  state = { username: '', password: '' };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { username, password } = this.state;
    const { handleLogin } = this.props;
    handleLogin(username, password, false);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      // @ts-ignore
      <Modal size="tiny" onClose={handleClose} open={this.props.showModal}>
        <Modal.Header>Σύνδεση</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Form error={loginError} onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                placeholder="Το όνομα χρήστης σας"
                required
                errorMessage="Το όνομα χρήστη δεν μπορεί να είναι άδειο!"
                onChange={this.handleChange}
                autoFocus
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                placeholder="Ο κωδικός σας"
                required
                errorMessage="Ο κωδικός δεν μπορεί να είναι άδειος"
                onChange={this.handleChange}
              />
              <Message error size="mini" content="Σφάλμα σύνδεσης Παρακαλούμε ελέγχτε τα στοιχεία σύνδεσής και προσπαθήστε ξανά." />
              <Button primary type="submit" floated="right">
                Σύνδεση
              </Button>
              {/* tslint:disable-next-line:jsx-no-lambda */}
              <Button secondary onClick={() => handleClose()} floated="right" tabIndex="1">
                Ακύρωση
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default LoginModal;
