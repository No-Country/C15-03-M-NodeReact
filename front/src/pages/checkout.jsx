import React, { useState, useEffect } from 'react';
import ContactInfo from './../components/checkout/contactInfo';
import ShippingMethodCard from './../components/checkout/envio';
import PaymentMethod from '../components/checkout/metodoDePago';
import CartInfo from './../components/checkout/infocarrito';
import CartPopup from '../components/checkout/cartPopup';
import CheckoutInfo from './../components/checkout/pago';

export default function Checkout() {

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectShippingMethod = (id) => {
    setSelectedShippingMethod(id);
  };

  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const shippingCosts = {
      'correoArgentino': 100,
      'oca': 200,
    };

    setShippingCost(shippingCosts[selectedShippingMethod] || 0);
  }, [selectedShippingMethod]);

  const handleShowCartPopup = () => {
    console.log('handleShowCartPopup called');
    setIsOpen(true);
   };
   

  const handleCloseCartPopup = () => {
    setIsOpen(false);
  };

  return (
    <div className='pt-24'>
      <div className="flex flex-col md:flex-row " >
        <div className="w-full md:w-1/2">
          <div className='p-6 m-4 mt-2 border rounded shadow-lg bg-white'>
            <h1 className="text-2xl mb-6 font-semibold">Datos de facturación</h1>
            <ContactInfo />
          </div>
          <div className='p-6 m-4 border rounded shadow-lg bg-white' >
            <h1 className="text-2xl mb-6 font-semibold">Métodos de Envío</h1>
            <div className='p-0 m-0 border rounded shadow-lg bg-white'>
            <ShippingMethodCard
              name="Envío por Correo Argentino"
              duration="(5 - 7 días)"
              price="$100"
              imageSrc="../../public/images/envio/Correo_Argentino_Logo.png"
              isFast={false}
              selected={selectedShippingMethod === 'correoArgentino'}
              onSelect={() => handleSelectShippingMethod('correoArgentino')}
            />
            </div>
            <div className='p-0 mt-1 border rounded shadow-lg bg-white'>
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
          </div>
          <div className='p-6 m-4 border rounded shadow-lg bg-white'>
            <h1 className="text-2xl mb-6 font-semibold">Métodos de Pago</h1>
            <PaymentMethod />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div>
          <CartInfo onShowPopup={handleShowCartPopup} onClose={handleCloseCartPopup} />


          {/* <CartPopup isOpen={isOpen} setIsOpen={setIsOpen} /> */}



          </div>
          <div>
            <CheckoutInfo shippingCost={shippingCost} />
          </div>
        </div>
      </div>
      
    </div>
  )
}
