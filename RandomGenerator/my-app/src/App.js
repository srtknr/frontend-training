import React from 'react';
import './App.css';


export default class RandomGenerate extends React.Component {
  
  state = {
    topValue: "React",
    bottomValue: "Generator",
    fontValue: 70,
    url: null,
    memes: [],
  }
    
    componentDidMount() {
      fetch('https://api.imgflip.com/get_memes')
        .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        let dataArray = (myJson.data.memes);      
        let randomNumber = Number(Math.floor(Math.random()*100));
        
        this.setState({
          memes: dataArray,
          url : dataArray[randomNumber].url,
        });
      });
    }
  
    
    setValue = (value, key) => {
      this.setState({
        [key]: value,
      });
    };

   renderPhoto = () => {
      let randomNumber = Number(Math.floor(Math.random()*this.state.memes.length));
      
      this.setState({
        url : this.state.memes[randomNumber].url,
      });
    };
      
    

  render () {

    const spanStyle = {
      fontSize: this.state.fontValue +"px",
    };

    const renderFull = (
      <div className="page">
        <div className="header">
        <input type="text" placeholder="Please enter top text" className="input-top" value={this.state.topValue}  onChange={(e) => this.setValue(e.target.value, "topValue")} />
        <input type="text" placeholder="Please enter bottom text" className="input-bottom" value={this.state.bottomValue} onChange={(e) => this.setValue(e.target.value, "bottomValue")} />
        <input type="number" placeholder="Please enter font size" className="input-font-size" value={this.state.fontValue}  onChange={(e) => this.setValue(e.target.value, "fontValue")} />
        <button type="button" onClick={this.renderPhoto} > Random </button>
        </div>
        <div className="image">
          <div className="top-text-container" >
            <span className="top-text" style={spanStyle}> {this.state.topValue} </span>
          </div>
          <div className="photo">
            <img src={this.state.url} />
          </div>
          <div className="bottom-text-container">
          <span className="bottom-text" style={spanStyle}> {this.state.bottomValue} </span>
          </div>
        </div>
      </div>
    );

    return(
      <div className="full-page" >
       {renderFull}
      </div>
    );
  }
}