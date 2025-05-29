import React from 'react';
import OrderItemCard from '@components/OrderIteamCard'

function OrderCard() {
    const ordercode = 124321341
    const status = "Pending"
    return (
            <div className="p-10 flex flex-col bg-[#242627]">

                <div id="ordercode w status" className='flex '>
                    <h1>ORDER-CODE:{ordercode}</h1>
                    <div className="flex rounded-full border-1 border-[#3A3C3D]">
                        {status}
                    </div>
                </div>

                <div id="itemsContainer" className='flex flex-col'>
                    <OrderItemCard/>

                </div>
                
            </div>

    );
}

export default OrderCard;
