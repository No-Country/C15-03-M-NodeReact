import React from 'react';

const CartPopup = ({ onClose }) => {
  return (
    <div className="popup-container">
      {/* Contenido del popup, puede ser el componente CartInfo */}
      <div className="popup-content">
        {/* Contenido del carrito u otros elementos */}
        
      </div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default CartPopup;