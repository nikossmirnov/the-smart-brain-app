import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInEmail: '',
      signInPassword: '',
      success: ''
    };
  }

  componentDidMount() {
    this.setState({ success: '' });
  }

  onEmailChange = event => {
    this.setState({
      signInEmail: event.target.value
    })
  }

  onPasswordChange = event => {
    this.setState({
      signInPassword: event.target.value
    })
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.email) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else {
        this.setState({ success: 'false' });
      }
    })
  }

  render() {
    let successSign = '';

    if (this.state.success === 'false') {
      successSign = <span className='error-loggin-in error'>Something went wrong.<br />Check your email and password and try again.</span>;
    }

    return (
      <div className='sign-in'>
        <div className='form'>
          <fieldset>
            <legend>Sign In</legend>
            <label htmlFor='email'>Email:</label><br />
            <input type='email' name='email' id='email' onChange={this.onEmailChange} required /><br />
            <label htmlFor='password'>Password:</label><br />
            <input type='password' name='password' id='password' onChange={this.onPasswordChange} required /><br />
            {successSign}
            <input type='submit' value='Sign In' id='submit' onClick={this.onSubmitSignIn} />
            <div id='register'>
              <p tabIndex='0' onClick={() => this.props.onRouteChange('register')}>Register</p>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default SignIn;
