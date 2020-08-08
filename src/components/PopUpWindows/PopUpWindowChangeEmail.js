import React, { Component } from 'react';
import PopUpWindowEmail from './PopUpWindowEmail';

let initialState = {
  currentEmail: '',
  newEmail: '',
  currentPassword: '',
  success: ''
};

class PopUpWindowChangeEmail extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onInputChange = event => {
    if (event.target.id === 'current-email') {
      this.setState({
        currentEmail: event.target.value
      });
    } else if (event.target.id === 'new-email') {
      this.setState({
        newEmail: event.target.value
      });
    } else if (event.target.id === 'current-password') {
      this.setState({
        currentPassword: event.target.value
      });
    }
  }

  changeEmail = () => {
    const { currentEmail, newEmail, currentPassword } = this.state;
    let beforeChange = {
      id: this.props.id,
      email: this.props.email
    };

    if (!currentEmail.length ||
        !newEmail.length ||
        !currentPassword.length ||
        currentEmail === newEmail) {
          this.setState({ success: 'false' });
    } else {
      fetch('http://localhost:3000/validatePassword', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: beforeChange.email,
          password: currentPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          fetch('http://localhost:3000/changeEmail', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: beforeChange.id,
              email: newEmail
            })
          })
          .then(response => response.json())
          .then(user => {
            if (user.id) {
              this.setState({ success: 'true' });
              this.props.updateUserEmail(user.email);
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
      <PopUpWindowEmail
        success={this.state.success}
        onInputChange={this.onInputChange}
        changeEmail={this.changeEmail}
        closePopUpWindow={this.closePopUpWindow}
      />
    );
  }
}

export default PopUpWindowChangeEmail;
