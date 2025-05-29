import React, { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';

import MainLayout from '@layouts/MainLayout';

import ProductPreviewCard from '@components/ProductPreviewCard';
import StarRating from '@components/StarRating';
import BranchCard from '@components/BranchCard';
import ProductCard from 'Components/ProductCard';

function ProductPage() {

    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts , setRelatedProducts] = useState([]);

    useEffect(() => {
        if(productId){
            fetch(`http://localhost:5000/api/product/${productId}`)
            .then(res => {
            if (!res.ok) throw new Error("Failed to load product");
            return res.json();
            })
            .then(data => setProduct(data))
            .catch(err => console.error(err));


            fetch(`http://localhost:5000/api/product/${productId}/get-related`)
            .then(res => {
            if (!res.ok) throw new Error("Failed to load product");
            return res.json();
            })
            .then(data => setRelatedProducts(data))
            .catch(err => console.error(err));
        }
    }, [productId]);

    if (!product) {
        return <p className="text-white">Loading...</p>;
    }
      
    function handleAddToWishlist(productId) {
        console.log('Added to wishlist:', productId);
    }
      

    return (
        <MainLayout>
            <div id="ProductDetails" className='w-full px-20 my-8 flex'>

                {/* product image section */}
                
                <ProductPreviewCard productImage={product.image} productId={product.id}/>

                {/* product details el price w name section */}
                <div id="TextDetails" className="flex flex-col px-6 border-r-1 border-[#242627] w-[50%]">
                    <h1 id="Brand" className="text-[#686868] font-bold text-2xl font-[IniraBold]">{product.BrandName}</h1>
                    <p id='title' className="w-[55%] text-[#C9C9C9] text-2xl leading-relaxed font-[IniraReg]">
                    {product.name}
                    </p>
                    <StarRating rating={parseFloat(product.rating)}/>
                    <h1 id='Price' className='py-2 text-white text-3xl font-[IniraBold]'>EGP {Number(product.price).toLocaleString()}</h1>
                </div>

                {/* info about el seller */}
                <div id="SellerDetails" className='w-120 flex flex-col font-[IniraBold] text-white mx-4' >

                    <h1 className='text-2xl text-[#D9D9D9] p-1'>Seller Details</h1>

                    <div id="details" className='p-4 pr-5 rounded-lg border-2 border-[#242627] '>


                        {/* el store logo w sold by info */}
                        <div id="storeInfo" className=' flex items-center  font-[IniraBold] text-white'>

                            {/*store logo */}
                            <div className="m-2 size-12 bg-[#242627] rounded-full p-1">
                                <img src="/store.png" alt="" />
                            </div>

                            {/* sold by : store name */}
                            <div className="flex flex-col text-xl">
                                <div className="flex">
                                    <h1 className='text-[#989898] mr-0.5'>Sold by:</h1>
                                    <h1>{product.storeName}</h1>   
                                </div>
                            </div>

                        </div>

                        {/* Branches info*/}
                        <div className="flex flex-col">
                            <h1 className='text-xl px-3'>Branches:</h1>

                            <div id="BranchesContainer" className='flex flex-col'>
                                {product.BranchStocks && product.BranchStocks.length > 0 ? (
                                    product.BranchStocks.map((branch, index) => (
                                        <BranchCard 
                                            key={index}
                                            city={branch.StoreAddress?.Gov || "N/A"}
                                            area={branch.StoreAddress?.District || "N/A"}
                                            address={branch.StoreAddress?.address || "N/A"}
                                            stock={branch.branchStockQty || 0}
                                        />
                                    )
                                )):(<div className='text-[#B4B4B4] text-lg'>No branches available</div>)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div id="productDesc" className='w-full my-7 flex flex-col gap-y-4 rounded-xl p-5 bg-[#242627]' style={{ width: 'calc(100% - 10em)' }}>
                <h1 className='text-white text-2xl font-[IniraBold]'>Product Details:</h1>
                <p className='text-[#B4B4B4]'>
                    {product.description}
                </p>
            </div>

            <div id="productRelated" className='flex flex-col w-full px-20 py-6 border-y-1 border-[#242627] gap-y-2'>

                <h1 className='text-white font-[IniraBold] text-2xl'>Products related to this item</h1>

                <div id="ProductCardsContainer" className='p-4 rounded-xl bg-[#242627] flex gap-x-5'>
                    {relatedProducts && relatedProducts.length > 0 ? (
                        relatedProducts.map((product, index) => (
                            <ProductCard
                                key={index}
                                product={product}
                                onAddToCart={() => handleAddToCart(product.id)}
                                onAddToWishlist={() => handleAddToWishlist(product.id)}
                            />
                        ))
                    ) : (
                        <p className="text-white">No related products found.</p>
                    )}

                </div>
            </div>

            <div id="Reviews" className='flex justify-center w-full rounded-xl text-[white] font-[IniraBold]'>

                <div className="flex mx-20 w-full  border-2 border-[#242627]  ">

                    <div className='flex flex-col'>
                        <h1>Overall rating</h1>
                        <div id="overallDetils">
                            <StarRating rating={3.4}/>
                        </div>
                    </div>

                    <div>
                        Reviews:
                    </div>
                </div>
                    
            </div>

        </MainLayout>
    );
}

export default ProductPage;
