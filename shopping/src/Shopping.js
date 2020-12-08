import "./Shopping.css";
import React, { useEffect, useState } from "react";
function Shopping() {
  const [product, setProduct] = useState([
    {
      name: "Shower Gel",
      price: 49.99,
    },
    {
      name: "Deodorant",
      price: 99.99,
    },
  ]);
  const [cart, setCart] = useState({});
  const MapCart = (target) => {
    if (cart.list) {
      for (let i = 0; i < cart.list.length; i++) {
        if (cart.list[i].name == target) {
          return cart.list[i].quantity;
          break;
        }
      }
    }
    return 0;
  };
  const Add = () => {
    let arr = [];
    let total = 0;
    for (let i = 0; i < product.length; i++) {
      let selected = document.getElementById(product[i].name);
      let index = selected.selectedIndex;
      let qt = index + MapCart(product[i].name);
      selected.options[0].selected = true;
      if (qt > 0) {
        const item = {
          name: product[i].name,
          quantity: qt,
          subtotal: Math.round(qt * product[i].price * 100) / 100,
        };
        arr.push(item);
      }
    }
    for (let i = 0; i < arr.length; i++) {
      total += arr[i].subtotal;
    }

    total = Math.round(total * 100) / 100;
    console.log(total, arr);
    setCart({
      list: arr,
      total: total,
    });
  };
  return (
    <div className="App">
      <div className="grid-container">
        <div className="grid-item ">
          <h1>Product list</h1>

          <div className="product-list">
            <h5 className="product">Name</h5>
            <h5 className="product">Price</h5>
            <h5 className="product"> Number</h5>
          </div>
          {product.map((item, index) => (
            <div className="product-list">
              <div className="product">{item.name}</div>
              <div className="product">${item.price}</div>
              <div className="product">
                <select id={item.name}>
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
            </div>
          ))}
          <br />

          <button style={{ float: "right" }} onClick={Add}>
            Add to shopping cart
          </button>
        </div>

        <div className="grid-item ">
          <h1>Shopping cart</h1>
          <div className="product-list">
            <h5 className="product">Name</h5>
            <h5 className="product">Quantity</h5>
            <h5 className="product"> Subtotal</h5>
          </div>
          {cart.list?cart.list.map((item, index) => (
            <div className="product-list">
              <div className="product">{item.name}</div>
              <div className="product">x{item.quantity}</div>
              <div className="product">${item.subtotal}</div>
            </div>
          )):null}
          {cart.total ? <div style={{textAlign:'right'}}>
          <p>Total price(before tax): {cart.total}</p>
          <p>Total price(after tax): {Math.round(cart.total * 1.125 * 100) / 100}</p>
          <p>Sales tax rate : 12.5%</p>
          </div> : null}
        </div>
      </div>
    </div>
  );
}

export default Shopping;
