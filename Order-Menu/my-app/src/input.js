import React from 'react';

export default class InputComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value : props.value,
    };
  }  

  handleChange = (e) => {
    this.setState ({
      value : e.target.value,
    });
  }

  render() {
   
   return(
     <input className="inputPiece" type="number" id={this.props.id} value={this.state.value} onChange={this.handleChange} />
    )
  }
}