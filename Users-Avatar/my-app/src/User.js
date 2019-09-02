import React from 'react';
import Avatar from './Avatar';

export default class User extends React.Component {
  
  state = {
    firstName: this.props.userInformations.first_name,
    lastName: this.props.userInformations.last_name,
  };

  deleteUser = () => {
    const requestOptions = {
      method: 'DELETE'
    };
    const { id } = this.props.userInformations;

    fetch('https://reqres.in/api/users/' + id, requestOptions )
      .then(function(response) {
    })
  }

  updateUser = () => {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        name: this.state.firstName,
        job: this.state.lastName,
      }),
    };
    const { id } = this.props.userInformations;

    fetch('https://reqres.in/api/users/' + id, requestOptions )
      .then(function(response) {
    })
    fetch('https://reqres.in/api/users', {  
      method: 'POST',
      
      body: JSON.stringify({
        name: this.state.newFirstName,
        job: this.state.newLastName,
      })
    })
  };

  setValue = (value, key) => {
    this.setState({
      [key]: value,
    });
  };
  
  render() {
    const { avatar, email } = this.props.userInformations;
    
    return (
      <div className="information-container"> 
        <Avatar userAvatar={avatar}/>
        <div className="user-info">
          <input type="input" className="user-input" value={this.state.firstName} onChange={(e) => this.setValue(e.target.value, "firstName")} />
          <input type="input" className="user-input" value={this.state.lastName} onChange={(e) => this.setValue(e.target.value, "lastName")} />
          <span className="email">{email}</span>
          <button type="button" onClick={this.deleteUser}>Delete</button>
          <button type="button" onClick={this.updateUser}>Update</button>
        </div>  
      </div>
    )
  }
}