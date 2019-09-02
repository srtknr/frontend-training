import React from 'react';

export default class Avatar extends React.Component {
  render() {
    const { userAvatar } = this.props;
    return (
      <div className="avatar-container">
        <img src={userAvatar} alt="user avatar"/>
      </div>
    )
  }
}