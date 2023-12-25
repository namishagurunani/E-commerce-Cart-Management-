import React, { useState } from 'react';
import './App.css';

// Product component to display individual products
const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

// CartItem component to display individual items in the cart
const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <p>{item.name}</p>
        <p>${(item.quantity * item.price).toFixed(2)}</p>
        <button onClick={() => removeFromCart(item)}>Remove</button>
      </div>
    </div>
  );
};

// CartIcon component to display the cart icon with the item count
const CartIcon = ({ itemCount }) => {
  return (
    <div id="cart-icon">
      🛒 <span>{itemCount}</span>
    </div>
  );
};

// Main App component
const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Samsung Galaxy S8', price: 399.99, image: 'https://www.course-api.com/images/cart/phone-1.png' },
    { id: 2, name: 'Google Pixel', price: 499.99, image: 'https://www.course-api.com/images/cart/phone-2.png' },
    { id: 3, name: 'Xiaomi Redmi Note 2', price: 699.99, image: 'https://www.course-api.com/images/cart/phone-3.png' },
    { id: 4, name: 'Samsung Galaxy S7', price: 599.99, image: 'https://www.course-api.com/images/cart/phone-4.png' },
  ]);

  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total cost of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div>
      <h1 id="center" style={{backgroundColor: "white"}}>UseReducer</h1>

      {/* Display products */}
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Display shopping cart */}
      <div className="shopping-cart">
        <h2>
          <CartIcon itemCount={cart.length} />
          Shopping Cart
        </h2>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
        ))}
        <p style={{marginLeft : "10px"}}>Total: ${calculateTotal().toFixed(2)}</p>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default App;
