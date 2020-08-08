import React, { Component } from 'react';
import PopUpWindowPassword from './PopUpWindowPassword';

let initialState = {
  currentEmail: '',
  currentPassword: '',
  newPassword: '',
  success: ''
};

class PopUpWindowChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onInputChange = event => {
    if (event.target.id === 'current-email') {
      this.setState({
        currentEmail: event.target.value
      });
    } else if (event.target.id === 'current-password') {
      this.setState({
        currentPassword: event.target.value
      });
    } else if (event.target.id === 'new-password') {
      this.setState({
        newPassword: event.target.value
      });
    }
  }

  changePassword = () => {
    const { currentEmail, currentPassword, newPassword } = this.state;

    if (!currentEmail.length ||
        !currentPassword.length ||
        !newPassword.length ||
        this.props.email !== currentEmail ||
        currentPassword === newPassword) {
          this.setState({ success: 'false' });
    } else {
      fetch('http://localhost:3000/validatePassword', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentEmail,
          password: currentPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.email) {
          fetch('http://localhost:3000/changePassword', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: currentEmail,
              password: newPassword
            })
          })
          .then(response => response.json())
          .then(email => {
            if (email === currentEmail) {
              this.setState({ success: 'true' });
            } else {
              this.setState({ success: 'false' });
            }
          })
        } else {
          this.setState({ success: 'false' });
        }
      })
    }
  }

  closePopUpWindow = () => {
    this.props.closePopUpWindow();
    this.setState(initialState);
  }

  render() {
    return (
      <PopUpWindowPassword
        success={this.state.success}
        onInputChange={this.onInputChange}
        changePassword={this.changePassword}
        closePopUpWindow={this.closePopUpWindow}
      />
    );
  }
}

export default PopUpWindowChangePassword;
