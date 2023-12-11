import React from 'react';

const ShippingMethodCard = ({ name, duration, price, imageSrc, isFast, selected, onSelect }) => {
 return (
  <div className="container mx-auto pt-1 pl-4 w-full ">
    <div className="relative w-full h-full flex items-center justify-between p-1">
      <div className="flex items-center">
        <input 
          type="radio" 
          id={name} 
          checked={selected} 
          onChange={onSelect} 
          className="form-radio h-3 w-4 text-blue-600"
        />
        <label htmlFor={name} className="ml-1 text-gray-700">
          <div className="flex items-center">
            <div className="flex items-center ">
              <div className="relative w-[10px] h-[10px]">
              </div>
              <div className="text-black text-md font-semibold pr-3">{price}</div>
            </div>
            <div className="flex items-center text-black text-[14px]">
              <div>{name}</div>
              <div>{duration}</div>
            </div>
          </div>
        </label>
      </div>
      <img className="h-18 w-20" src={imageSrc} alt="Shipping Method" />
    </div>
  </div>
 );
};

export default ShippingMethodCard;


