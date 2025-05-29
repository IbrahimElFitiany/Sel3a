import React from 'react';


function OrderItemCard() {
    const orderItemVode = 124321341
    const status = "Pending"
    const Price = 9213
    const qty = 2
    const productIMg = "/Anker.jpg"
    const productTitle = "P20i Bluetooth Earphones, 10mm Drivers with Big Bass True Wireless Earbuds, 30H Playtime, IPX5, 2 Mics for AI Clear Calls, 22 Preset EQs, Customization via App Black+Gray"
    return (
            <div className="flex justify-between items-center p-2 text-white font-[IniraReg]  border-1 border-[#3A3C3D] rounded-2xl">

                <div id="image" className='flex '>
                    <img src={productIMg} alt="" className='rounded-2xl w-full h-full object-cover'/>
                </div>

                <div id="Title , price wl qty" className='flex flex-col justify-around text-lg '>
                    <div id="title">
                        {productTitle}
                    </div>

                    <div id="price w qty" className='flex'>
                        <h1>EGP{Price}</h1>
                        <h3>x{qty}</h3>
                    </div>

                </div>

                <div id="orderitemcode">
                    <h1>ORDER-ITEM{orderItemVode}</h1>
                </div>

            </div>

    );
}

export default OrderItemCard;
