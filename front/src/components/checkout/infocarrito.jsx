import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './../context/CartContext';
import { useContext } from 'react';
import CartPopup from './cartPopup';

const CartInfo = ({ onShowPopup }) => {
    const { cartItems } = useContext(CartContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="p-6 m-4 border rounded shadow-lg bg-white">
            <div className="text-2xl mb-6 font-semibold">Ver mis productos</div>
            <div className='p-6 m-4 border rounded shadow-lg bg-white'>
            <div className="text-gray-700 mb-2">Productos en el carrito: {cartItems.length}</div>

            {/* Additional content as needed */}

            <button
                className="px-4 py-2 bg-indigo-800 text-white rounded cursor-pointer hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800"
                onClick={() => {
                    setIsPopupOpen(true);
                    onShowPopup();
                }}
            >
                Ver carrito
            </button>
           
            {isPopupOpen && (
                <div>
                    <CartPopup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />
                </div>
            )} </div>
        </div>
    );
};

CartInfo.propTypes = {
    onShowPopup: PropTypes.func.isRequired,
};

export default CartInfo;
