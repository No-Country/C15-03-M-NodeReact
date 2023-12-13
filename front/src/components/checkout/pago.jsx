import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './../context/CartContext';

const CheckoutInfo = ({ shippingCost }) => {
  const { cartItems } = useContext(CartContext);

  const subtotal = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  const total = subtotal + (shippingCost || 0);

  return (
    <div className="p-6 m-4 border rounded shadow-lg bg-white">
      <h2 className="text-2xl mb-6 font-semibold">Información de la compra</h2>
      <div className="mb-2 text-gray-700 flex justify-between items-center">
        <p>Subtotal:</p>
        <p>${subtotal.toFixed(2)}</p>
      </div>
      <hr className="my-1 border-gray-300" />
      <div className="mb-2 text-gray-700 flex justify-between items-center">
        <p>Envío:</p>
        <p>${(shippingCost || 0).toFixed(2)}</p>
      </div>
      <hr className="my-1 border-gray-300" />
      <div className="mb-6 text-xl font-bold text-gray-800 flex justify-between items-center">
        <p>Total:</p>
        <p>${total.toFixed(2)}</p>
      </div>
      <hr className="my-1 border-gray-300" />
      <button className="px-4 py-2 bg-indigo-800 text-white rounded cursor-pointer hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
        Pagar ${total.toFixed(2)}
      </button>
    </div>
  );
};

CheckoutInfo.propTypes = {
  shippingCost: PropTypes.number.isRequired,
};

export default CheckoutInfo;
