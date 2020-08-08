import React, { Component } from 'react';
import PopUpWindowAccount from './PopUpWindowAccount';

let initialState = {
  currentPassword: '',
  success: ''
}

class PopUpWindowDeleteAccount extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onInputChange = event => {
    this.setState({
      currentPassword: event.target.value
    });
  }

  deleteAccount = () => {
    const { currentPassword } = this.state;

    if (!currentPassword.length) {
      this.setState({
        success: 'false'
      });
    } else {
      fetch('http://localhost:3000/validatePassword', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.props.email,
          password: currentPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          fetch('http://localhost:3000/deleteAccount', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: this.props.email
            })
          })
          .then(response => response.json())
          .then(response => {
            if (response === 'account has been deleted') {
              this.setState({ success: 'true' });

              setTimeout(() => this.props.onRouteChange('signOut'), 2000);
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
      <PopUpWindowAccount
        success={this.state.success}
        onInputChange={this.onInputChange}
        deleteAccount={this.deleteAccount}
        closePopUpWindow={this.closePopUpWindow}
      />
    );
  }
}

export default PopUpWindowDeleteAccount;
