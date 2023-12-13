import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './../context/CartContext';
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";

const CartPopup = ({ isOpen, setIsOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const [hoveredItemId, setHoveredItemId] = useState(null);

  return (
    <div className="relative -ml-12">
      <div className={`popup-container absolute bg-white rounded shadow-lg mt-2  ${isOpen ? '' : 'hidden'}`}>
        <div className="popup-content p-12">
          {cartItems.length > 0 ? (<>
          {cartItems.map((item) => (
            <div key={item.id} className="mb-4">
              <img
                src={`/images/products/${item.titulo}.png`}
                alt={item.titulo}
                className="h-10 w-10 object-cover rounded mr-2"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.titulo}</h2>
                <p className="text-gray-500">${item.precio}</p>
                <p className="text-gray-500">Cantidad: {item.quantity}</p>
              </div>
              <button
                className="ml-2 text-red-500"
                onClick={() => removeFromCart(item.id)}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
              >
                {hoveredItemId === item.id ? <RiDeleteBin7Fill /> : <RiDeleteBin7Line />}
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              clearCart();
              setIsOpen(false);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Limpiar Carrito
          </button>
          </>
          ) : ( 
            <p className='pt-2'>No hay productos en el carrito</p>
          )}
        </div>
        <button onClick={() => setIsOpen(false)} className="absolute bottom right-0 p-2 border border-gray-300 rounded bg-red-500">
          Cerrar
        </button>
      </div>
    </div>
  );
};

CartPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartPopup;