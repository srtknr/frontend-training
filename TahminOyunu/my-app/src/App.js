import React from 'react';
import './App.css';

export default class TahminOyunu extends React.Component {
  
  state = ({
    value: 0,
    counter: 0,
    randomValue: null,
    text:"",
  });
  

  componentDidMount() {
    this.setState({
      randomValue: Number(Math.floor(Math.random()*100)),
    });
  } 

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  
  
  handleClick = () => {
    let sabitDeger = this.state.randomValue;
    let inputValue = Number(this.state.value);
    let counter = Number(this.state.counter);
    
    if(this.state.counter < 9 ) {
      if(inputValue < sabitDeger) {
        counter++;
        this.setState({
          text:"Daha buyuk deger giriniz...",
        });
        
      } else if (inputValue === sabitDeger) {
        this.setState({
          text:"tebrikler",
        });

        } else {
          counter++;
          this.setState({
            text:"Daha kucuk deger giriniz...",
          });
      }
      this.setState({
        counter
      });
    } else {
      this.setState({
        text:"kaybettin",
      });
    }    
  };
 
  render () {

    return(
      <div className="full-page">
        <span>0-100 arasi bir sayi giriniz.</span>
        <input className="inputValue" type="string"  value={this.state.value} onChange={this.handleChange} />
        <button type="button" className="sendNumber" onClick={this.handleClick} >Send Number </button>
        <div>{this.state.text}</div>
       </div>
    )
  }
}
