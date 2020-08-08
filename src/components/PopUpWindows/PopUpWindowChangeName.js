import React, { Component } from 'react';
import PopUpWindowName from './PopUpWindowName';

let initialState = {
  newName: '',
  success: ''
};

class PopUpWindowChangeName extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onInputChange = event => {
    this.setState({
      newName: event.target.value
    });
  }

  changeName = () => {
    const { newName } = this.state;
    let beforeChange = {
      id: this.props.id,
      name: this.props.name
    };

    if (!newName.length ||
        beforeChange.name === newName) {
        this.setState({ success: 'false' });
    } else {
      fetch('http://localhost:3000/changeName', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: beforeChange.id,
          name: newName
        })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.setState({ success: 'true' });
          this.props.updateUserName(user.name);
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
      <PopUpWindowName
        success={this.state.success}
        onInputChange={this.onInputChange}
        changeName={this.changeName}
        closePopUpWindow={this.closePopUpWindow}
      />
    );
  }
}

export default PopUpWindowChangeName;
