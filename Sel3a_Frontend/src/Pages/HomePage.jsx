import React from 'react';
import MainLayout from '@layouts/MainLayout';
import BannerSlider from '@components/BannerSlider';

function HomePage() {
    return (
        <MainLayout>
            <div className='w-full flex flex-col justify-center items-center'>

                {/* Sales Area */}
                <div id="SalesContainer" className='py-8 px-40 w-full h-[500px] flex gap-x-3 justify-between border-b border-[#242627]'>

                    <button className='cursor-pointer'>
                        <div id='main banner' className="h-full">
                            <img src="/sale.png" className='h-full object-cover' alt="" />
                        </div>
                    </button>

                    <div id='additional_sales' className="h-[97.3%] flex flex-col justify-between items-end grow gap-y-3">
                    
                        <div id="sale1" className="h-1/2 w-full">
                            <button className='w-full h-full cursor-pointer'>
                                <img src="/miniSale.avif" className=' rounded-2xl h-full w-full object-cover' alt="" />
                            </button>
                        </div>

                        <div id="sale2" className="h-1/2 w-full">
                            <button className='w-full h-full cursor-pointer'>
                                <img src="/miniSale2.avif" className=' rounded-2xl h-full w-full object-cover' alt="" />
                            </button>
                        </div>

                    </div>

                </div>
                {/* Sales Banner */}
                <BannerSlider />

                {/* Seawrch By Cat */}
                <div id="searchByCategory" className='py-2 pt-5 px-40 w-[100%] flex justify-between border-y-1 border-[#242627] '>

                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>

                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>

                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>

                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>

                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>

                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>
                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>
                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>
                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>
                <div id="category">
                    <img src="/Laptops.png" className='w-30' alt="" />
                </div>

                </div>

                {/* Search By Brand */}
                <div id="Brands" className='w-full px-40 py-8 flex justify-center'>

                    <div className="w-full h-[400px] flex flex-col justify-center items-center rounded-xl bg-[#242627]">

                        <h1 className='text-white text-5xl font-[IniraBold] my-4'>SHOP BY BRANDS: (tt3ml b3den)</h1>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default HomePage;
