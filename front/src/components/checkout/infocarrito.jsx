import React from 'react';
import PropTypes from 'prop-types';

const CartInfo = ({ onShowPopup }) => {
    return (
        <div className=" bg-[#ffffff] rounded mt-20 p-4 ">
            <div className="text-[#000000] font-bold-16-px-font-family text-bold-16-px-font-size leading-bold-16-px-line-height font-bold-16-px-font-weight relative flex items-center">
                <span>Ver mis productos</span>
                <svg onClick={onShowPopup} className="w-[13px] h-[9px] ml-2" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.26799 6.07909C4.86821 6.55848 4.13179 6.55848 3.73201 6.0791L0.238902 1.89046C-0.304217 1.2392 0.158881 0.249999 1.00689 0.249999L7.99311 0.25C8.84112 0.25 9.30422 1.2392 8.7611 1.89046L5.26799 6.07909Z" fill="black" />
                </svg>
            </div>
            <div className="text-[#000000] font-regular-12-p-font-family text-regular-12-p-font-size leading-regular-12-p-line-height font-regular-12-p-font-weight ml-2 mt-2">
                3 productos en el carrito
            </div>
        </div>
    );
};

CartInfo.propTypes = {
    onShowPopup: PropTypes.func.isRequired,
};

export default CartInfo;
