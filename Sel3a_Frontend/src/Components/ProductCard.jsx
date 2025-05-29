import React from 'react';
import { useNavigate } from 'react-router-dom';


function ProductCard({ product, onAddToCart, onAddToWishlist }) {

  const navigate = useNavigate();

  const goToProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div onClick={goToProductPage} className="flex flex-col bg-[#3A3C3D] w-[200px] p-2 rounded-xl gap-y-1 hover:scale-[1.01] transition duration-300 hover:shadow-lg hover:shadow-[#00000017] cursor-pointer">

      {/* Product image + wishlist icon */}
      <div className="relative">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist(product.id);
          }}
          className="absolute top-2 right-2 z-10 p-1 bg-[#3A3C3D] rounded-xl shadow-md shadow-[#00000071] cursor-pointer transition duration-300 hover:brightness-110 hover:scale-[1.01]"
        >
          <img src="/addtowishlist.png" alt="Add to Wishlist" className="w-6 h-6" />
        </button>

        <img 
          src={product.image} 
          className="w-full h-[200px] object-cover rounded-xl" 
          alt={product.name} 
        />
      </div>

      {/* Product Name*/}
      <div className='font-[IniraBold] text-lg pt-3 text-[#d4d4d4] text-left line-clamp-2'>
        {product.name}
      </div>

      {/* Product Description */}
      <div className='mb-2 mt-1 flex justify-between font-[IniraBold] text-white'>
      <div className='text-lg'>
        EGP {Number(product.price).toLocaleString('en-EG', { minimumFractionDigits: 2 })}
      </div>

        <div 
          className="mt-1 size-10 bg-white rounded-xl shadow-md shadow-[#00000071] transition duration-300 hover:brightness-120 hover:scale-[1.04]"
        >
          <button className="cursor-pointer w-full h-full" onClick={(e) => {e.stopPropagation();onAddToCart(product.id)}}>
            <img src="/addCart.png" className="p-1" alt="Add To Cart" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
