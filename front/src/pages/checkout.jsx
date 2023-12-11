import React, { useState } from 'react';
import ContactInfo from './../components/checkout/contactInfo';
import ShippingMethodCard from './../components/checkout/envio';
import PaymentMethod from '../components/checkout/metodoDePago';
import CartInfo from './../components/checkout/infocarrito';
import CartPopup from '../components/checkout/cartPopup'; 


export default function Checkout() {
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [showCartPopup, setShowCartPopup] = useState(false);
  
  const handleSelectShippingMethod = (id) => {
    setSelectedShippingMethod(id);
  };

  const handleShowCartPopup = () => {
    setShowCartPopup(true);
  };

  const handleCloseCartPopup = () => {
    setShowCartPopup(false);
  };

  console.log("hola mundo")

  return (
    <div className='pt-8'>
      <div className="flex flex-col md:flex-row " >
        <div className="w-full md:w-1/2">
          <div className='p-2 ml-12  mb-4 mt-20 border border-gray-300 rounded'>
            <h1 className='pl-14 text-black text-lg font-semibold '>Datos de facturación</h1>
          <ContactInfo />
          </div>
          <div className='p-2 ml-12 pt-4 mb-4 border border-gray-300 rounded' >
            <h1 className='pl-14 text-black text-lg font-semibold '>Métodos de Envío</h1>
          <ShippingMethodCard
            name="Envío por Correo Argentino"
            duration="(5 - 7 días)"
            price="$100"
            imageSrc="../../public/images/envio/Correo_Argentino_Logo.png"
            isFast={false}
            selected={selectedShippingMethod === 'correoArgentino'}
            onSelect={() => handleSelectShippingMethod('correoArgentino')}
          />
          <ShippingMethodCard
            name="Envío por OCA"
            duration=" (2 - 3 días)"
            price="$200"
            imageSrc="../../public/images/envio/logo-oca.png"
            isFast={true}
            selected={selectedShippingMethod === 'oca'}
            onSelect={() => handleSelectShippingMethod('oca')}
          />
          </div>
          <div>
          <h1 className='pl-14 text-black text-lg font-semibold '>Métodos de Pago</h1>
          <PaymentMethod/>
          </div>
        </div>
        <div className="w-full md:w-1/2">
        <div>
          <CartInfo onShowPopup={handleShowCartPopup}/>
          </div>
        </div>
      </div>
      {showCartPopup && <CartPopup onClose={handleCloseCartPopup} />}
    </div>

  )
}
