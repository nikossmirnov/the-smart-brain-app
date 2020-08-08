import React, { Component } from 'react';
import './Settings.css';
import PopUpWindowChangeName from '../PopUpWindows/PopUpWindowChangeName';
import PopUpWindowChangeEmail from '../PopUpWindows/PopUpWindowChangeEmail';
import PopUpWindowChangePassword from '../PopUpWindows/PopUpWindowChangePassword';
import PopUpWindowDeleteAccount from '../PopUpWindows/PopUpWindowDeleteAccount';
import '../PopUpWindows/PopUpWindow.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingSection: ''
    };
  }

  openPopUpWindow = event => {
    this.setState({
      editingSection: event.target.id
    });
  }

  closePopUpWindow = () => {
    this.setState({
      editingSection: ''
    });
  }

  render() {
    const { editingSection } = this.state;
    const { id, name, email, updateUserName, updateUserEmail, onRouteChange } = this.props;
    let popUpWindow = '';

    if (editingSection === 'edit-name') {
      popUpWindow = <PopUpWindowChangeName
                      id={id}
                      name={name}
      								updateUserName={updateUserName}
                      closePopUpWindow={this.closePopUpWindow}
                    />;
    } else if (editingSection === 'edit-email') {
      popUpWindow = <PopUpWindowChangeEmail
                      id={id}
                      email={email}
      								updateUserEmail={updateUserEmail}
                      closePopUpWindow={this.closePopUpWindow}
                    />;
    } else if (editingSection === 'edit-password') {
      popUpWindow = <PopUpWindowChangePassword
                      email={email}
                      closePopUpWindow={this.closePopUpWindow}
                    />;
    } else if (editingSection === 'delete-account') {
      popUpWindow = <PopUpWindowDeleteAccount
                      id={id}
                      email={email}
                      onRouteChange={onRouteChange}
                      closePopUpWindow={this.closePopUpWindow}
                    />;
    }

    return (
      <div className='wrapper-settings'>
        {popUpWindow}
        <div className='settings'>
          <p className='settings-section-title'>User info</p>
          <div className='settings-section'>
            <p className='settings-section-top'>Name:</p>
            <p className='settings-section-bottom'>{name}</p>
            <span className='account-edit success' id='edit-name' onClick={this.openPopUpWindow}>edit name</span>
          </div>
          <div className='settings-section'>
            <p className='settings-section-top'>Email:</p>
            <p className='settings-section-bottom'>{email}</p>
            <span className='account-edit success' id='edit-email' onClick={this.openPopUpWindow}>edit email</span>
          </div>
          <div className='settings-section'>
            <p className='settings-section-top'>Password:</p>
            <p className='settings-section-bottom explanation'>*hidden</p>
            <span className='account-edit success' id='edit-password' onClick={this.openPopUpWindow}>edit password</span>
          </div>
          <div className='settings-section'>
            <p className='settings-section-top'>Delete account</p>
            <p className='settings-section-bottom explanation'>Permanently delete your account.</p>
            <span className='account-edit error' id='delete-account' onClick={this.openPopUpWindow}>delete account</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
