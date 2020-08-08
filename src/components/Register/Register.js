import React, { Component } from 'react';
import '../SignIn/SignIn.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      success: ''
    };
  }

  componentDidMount() {
    this.setState({ success: '' });
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    })
  }

  onPasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  onSubmitRegister = () => {
    const { name, email, password } = this.state;

    if (!name.length ||
        !email.length ||
        !password.length) {
          this.setState({ success: 'false' });
    } else if (password.length < 6) {
      this.setState({ success: 'short password' });
    } else {
      fetch('http://localhost:3000/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          this.setState({ success: 'false' });
        }
      })
    }
  }

  render() {
    let successSign = '';

    if (this.state.success === 'false') {
      successSign = <span className='error-loggin-in error'>Something went wrong.<br />Check your name, email, and password and try again.</span>;
    } else if (this.state.success === 'short password') {
      successSign = <span className='error-loggin-in error'>Password should be at least 6 characters long.</span>;
    }

    return (
      <div className='sign-in'>
        <div className='form'>
          <fieldset>
            <legend>Register</legend>
            <label htmlFor='name'>Name:</label><br />
            <input type='text' name='name' id='name' onChange={this.onNameChange} required /><br />
            <label htmlFor='email'>Email:</label><br />
            <input type='email' name='email' id='email' onChange={this.onEmailChange} required /><br />
            <label htmlFor='password'>Password:</label><br />
            <input type='password' name='password' id='password' onChange={this.onPasswordChange} required /><br />
            {successSign}
            <input type='submit' value='Register' id='submit' onClick={this.onSubmitRegister} />
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Register;
