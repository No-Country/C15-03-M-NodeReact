import React, { useState } from 'react';

const PaymentMethod = () => {
    const [paymentOption, setPaymentOption] = useState('card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');

    const handlePaymentOptionChange = (option) => {
        setPaymentOption(option);
    };

    return (
        <div className="w-full h-full flex items-center pl-12  ">
            <div className="pt-5 ">
                {/* Opción de Pago en Efectivo */}
                <div className="pl-8 pt-2 pb-2 mb-4 border border-gray-300 rounded ">
                    <input
                        type="radio"
                        id="cash"
                        name="paymentOption"
                        value="cash"
                        checked={paymentOption === 'cash'}
                        onChange={() => handlePaymentOptionChange('cash')}
                        className="mr-2"
                    />
                    <label htmlFor="cash">Pago en Efectivo</label>
                </div>

                {/* Opción de Pago con Tarjeta */}
                <div className='p-2 pl-8 pr-8 pt-4 pb-8 mb-4  border border-gray-300 rounded '>
                    <div className="mb-4 flex items-center ">
                        <input
                            type="radio"
                            id="card"
                            name="paymentOption"
                            value="card"
                            checked={paymentOption === 'card'}
                            onChange={() => handlePaymentOptionChange('card')}
                            className="mr-2"
                        />
                        <label htmlFor="card">Pago con Tarjeta</label>

                        {/* Imágenes de tarjetas disponibles */}
                        <div className="flex gap-2 items-center ml-36">
                            {/* Imagen 1 */}
                            <img style={{ width: 35, height: 20 }} src="../public/images/pagos/Mastercard.png" alt="Tarjeta 1" />
                            {/* Imagen 2 */}
                            <img style={{ width: 35, height: 20 }} src="../public/images/pagos/visa-logo.png" alt="Tarjeta 2" />
                            {/* Imagen 3 */}
                            <img style={{ width: 35, height: 20 }} src="../public/images/pagos/Maestro.png" alt="Tarjeta 3" />
                        </div>
                    </div>

                    {/* Inputs para número de tarjeta y fecha de vencimiento */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Número de Tarjeta"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-1/2 h-10 mt-2 border border-gray-300 rounded px-2"
                        />
                        <input
                            type="text"
                            placeholder="Fecha de Vencimiento"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-1/2 h-10 mt-2 border border-gray-300 rounded px-2"
                        />
                    </div>

                    {/* Input para código de seguridad */}
                    <input
                        type="text"
                        placeholder="***"
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                        className="1/2 h-10 mt-2 border border-gray-300 rounded px-2"
                    />

                    {/* Texto "¿Qué es esto?" */}
                    <div className="text-black text-sm mt-2">
                        ¿Qué es esto?
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
