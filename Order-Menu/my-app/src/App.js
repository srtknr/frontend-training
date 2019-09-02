import React from 'react';
import './App.css';
import InputComponent from "./input";
import { find } from 'lodash';

export default class OrderMenu extends React.Component {
  
  state = {
    basket : [],
    totalPrice: 0,
  };
  
  addItem = item => {
    let basketList = this.state.basket;
    let inputValue = Number(document.getElementById(item.id).value);
    let basketTotalPrice = this.state.totalPrice + (item.price * inputValue);
    let addedProduct = find(basketList, function(o) {return o.name === item.name;});
    
    item.counter = inputValue;
    
    this.setValue(basketList, "basket");

    if(addedProduct){
      addedProduct.counter += inputValue;
    } else {
      basketList.push(item);
    }

    this.setValue(basketTotalPrice, "totalPrice");
  };

  removeItem = (item) => {
    let basketList = this.state.basket;
    let basketTotalPrice = this.state.totalPrice - item.price;
    
    this.setValue(basketList, "basket"); 
    
    if(item.counter > 1) {
      item.counter--;
    } else {
      basketList.splice(basketList.indexOf(item), 1);
    }

    this.setValue(basketTotalPrice, "totalPrice");
  };

  removeAllItems = () => {
    let emptyArray = [];
    
    this.setValue(emptyArray, "basket");
    
    this.setValue(0, "totalPrice");
  }

  setValue = (value, key) => {
    this.setState({
      [key]: value,
    });
  };
  
  render() {
    const { basket } = this.state;
    let myMenu = [
      {
        id: 1,
        name:'Tuborg',
        price: 12,
      },
      {
        id: 2,
        name:'Corona',
        price: 15,
      },
      {
        id: 3,
        name:'Heineken',
        price: 17,
      },
      {
        id: 4,
        name:'Duvel',
        price: 14,
      },
      {
        id: 5,
        name:'Becks',
        price: 13,
      },
      {
        id: 6,
        name:'Hoegaarden',
        price: 18,
      },
    ];
    
    const renderMenu = myMenu.map((item,i) => (
      <div className="menu-item" id={`product${i+1}`} key={i}>
        <p className="item-name">{item.name}</p>
        <span className="item-price">{item.price}TL</span>
        <InputComponent
          id={item.id}
          inputitem={item}
          value={1}
        />
        <button type="button" id={`add${item.name}`} onClick={() => this.addItem(item)}>Add</button> 
      </div>  
    ));

    const renderBasket = basket.map((item,i) => (
      <div className="menu-item" id={`product${i+1}`} key={i}>
        <p className="basket-item-name">{item.name}</p>
        <p className="basket-item-piece">x{item.counter}</p>
        <span className="basket-item-price">{item.price}TL</span>
        <button type="button" id={`remove${item.name}`} onClick={() => this.removeItem(item)}>Remove</button> 
      </div>  
    ));

    return (
      <div className="full-page">
        <div className="menu-container">
          <div className="menu_title">
            <h1>DRINK MENU</h1>
          </div>
          <div className="menu_header">
            <span className="header_product">Product</span>
            <span className="header_price">Price</span>
          </div>
          <div className="products">
             {renderMenu}
          </div>
        </div>
        <div className="basket-container">
        <div className="basket-title"> 
            <h1>BASKET</h1>
          </div>
          {this.state.basket.length > 0 &&
          <div>
            
          <div className="basket_header">
            <span className="header_product">Product</span>
            <span className="header_piece">Piece</span>
            <span className="header_price">Unit Price</span>
          </div>
          <div className="basket-products">
           {renderBasket}
          </div>
            <div className="basket-footer">
              <div className="total-price-container">
                <span className="total_price">Total Price :</span> 
                {this.state.totalPrice}  TL
              </div>
              <button type="button" onClick={this.removeAllItems}>Remove All</button>
            </div>
          </div>  
          }
        </div>
      </div>
    );
  }
}