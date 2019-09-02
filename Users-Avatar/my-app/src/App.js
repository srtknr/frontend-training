import React from 'react';
import './App.css';
import User from './User';
import Modal from './Modal';

export default class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isOpenModal: false,
      newFirstName: null,
      newLastName: null,
    };
  }  

  componentDidMount() {
    fetch('https://reqres.in/api/users')
      .then(function(response) {
        return response.json();
    })
    .then(myJson => {
      this.setState({
        data: myJson.data,
      });
    });
  }
  
  renderUsers = () => {
    const { data } = this.state;
    
    return data.map((item, index) => (
      <User userInformations={item} key={index} />
    ));
  };

  renderModal = () => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
    }));
  };

  setValue = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  createUser = () => {
    fetch('https://reqres.in/api/users', {  
      method: 'POST',
      
      body: JSON.stringify({
        name: this.state.newFirstName,
        job: this.state.newLastName,
      })
    })
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
    }));
  };
 
  render () {
  
    return (
      <div className="full-page">
        <div className="header-container">
          <span>User List</span>
          <button type="button" onClick={this.renderModal}>Create User</button>
        </div>
        <div className="users-container">
          {this.renderUsers()}
        </div>
        {this.state.isOpenModal && 
          <Modal>
            <div className="modal-content">
                <button className="modal-close-button" type="button" onClick={this.renderModal}>X</button>
                <div className="modal-inputs-container">
                  <input className="modal-input" placeholder="Please enter first name" type="text" value={this.state.newFirstName} onChange={(e) => this.setValue(e.target.value, "newFirstName")} />
                  <input className="modal-input" placeholder="Please enter last name" type="text" value={this.state.newLastName} onChange={(e) => this.setValue(e.target.value, "newLastName")} />
                </div>
                <button type="button" className="modal-button" onClick={this.createUser} >Create User</button>
            </div>
          </Modal>
        } 
      </div>
    )
  }
}