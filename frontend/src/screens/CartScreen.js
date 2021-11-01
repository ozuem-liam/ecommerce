import "./CartScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import axios from "axios";

// Components
import CartItem from "../components/CartItem";

function CartScreen() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  const [message, setMessage] = useState("");

  const sendOrder = async () => {
    function getOrder() {
      let obj = {};
      for (let i = 0; i < cartItems.length; i++) {
        let orderObj = {};
        if (cartItems) {
          orderObj = cartItems[i];
        }
        obj[i] = orderObj;
      }
      obj["address"] = values.address;
      obj["number"] = values.number;
      return obj;
    }
    let order = getOrder();
    const result = await axios.post(
      "http://127.0.0.1:5000/api/products/send",
      order,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (result) {
      setMessage("Your order is successful");
    }
    setTimeout(() => {
      setMessage("");
    }, 5000); 
  };

  const [values, setValues] = useState({
    address: "",
    number: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="cartscreen">
      <div className="cartscreen_left">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.product}
              item={item}
              qtyChangeHandler={qtyChangeHandler}
              removeHandler={removeHandler}
            />
          ))
        )}
      </div>
      <div className="cartscreen_right">
        <div className="cartscreen_info">
          <p>Subtotal ({getCartCount()}) items</p>
          <p>#{getCartSubTotal().toFixed(2)}</p>
        </div>
        <div>
        <div className="form-inputs">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            className="form-input"
            placeholder="Enter your address"
            value={values.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-inputs">
          <label htmlFor="description" className="form-label">
            Phone number
          </label>
          <input
            id="number"
            type="text"
            name="number"
            className="form-input"
            placeholder="Enter your phone number"
            value={values.number}
            onChange={handleChange}
          />
        </div>
        </div>
        <div>
          <h5>Account Name: Yossie</h5>
          <h5>Account Number: XXXXXXXXXXX</h5>
        </div>
        <div>
          <button type="submit" onClick={sendOrder}>
            Proceed To Checkout
          </button>
        </div>
        {message && <h3 style={{ height: "300px", textAlign: "center", color: "green" }}>{message}</h3>}
      </div>
    </div>
  );
}

export default CartScreen;
