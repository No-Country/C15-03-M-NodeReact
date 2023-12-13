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
        <div className="container mx-auto pt-0 pl-0">
            <div className="w-full h-full flex items-center pl-1">
                <div className="pt-0 w-full">
                    <div className="w-full p-6 mb-4 border border-gray-300 rounded shadow-lg bg-white">
                        <div className="mb-4 flex items-center">
                            <input
                                type="radio"
                                id="card"
                                name="paymentOption"
                                value="card"
                                checked={paymentOption === 'card'}
                                onChange={() => handlePaymentOptionChange('card')}
                                className="mr-1"
                            />
                            <label htmlFor="card" className="font-semibold">Pago con Tarjeta</label>
                            <div className="flex gap-2 items-center ml-20">
                                {/* Imágenes de tarjetas disponibles */}
                                <img style={{ width: 35, height: 20 }} src="../public/images/pagos/Mastercard.png" alt="Tarjeta 1" />
                                <img style={{ width: 35, height: 20 }} src="../public/images/pagos/visa-logo.png" alt="Tarjeta 2" />
                                <img style={{ width: 35, height: 20 }} src="../public/images/pagos/Maestro.png" alt="Tarjeta 3" />
                            </div>
                        </div>
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
                        <input
                            type="text"
                            placeholder="***"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            className="w-full h-10 mt-2 border border-gray-300 rounded px-2"
                        />
                        <div className="text-black text-sm mt-2">
                            ¿Qué es esto?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;

