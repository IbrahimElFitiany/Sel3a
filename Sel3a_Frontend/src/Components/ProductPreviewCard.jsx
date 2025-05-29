import React, { useState } from 'react';
import { SyncLoader } from 'react-spinners';  // Import PulseLoader

function ProductPreviewCard({ productImage, productId }) {

  const token = localStorage.getItem("token");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [addedToCart, setAddedToCart] = useState(false); // Success state to show message


  const handleAddToCart = (productId, quantity) => {
    setLoading(true);
    setAddedToCart(false);

    fetch(`http://localhost:5000/api/cart`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      
      },
      body: JSON.stringify({
        productId: productId,
        qty: quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Product added to cart:", data);

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      setAddedToCart(true);
    })
    .catch(error => {
      console.error("Error adding to cart:", error);
      setLoading(false); // Reset loading state
    });
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <div className='flex flex-col'>

      <div className="w-[400px] min-w-[400px] flex flex-col items-center bg-[#242627] p-3 rounded-xl">

        <div id="imgContainer" className='w-full'>
          <img src={productImage} className='w-full h-full object-cover rounded-2xl' alt="" />
        </div>

        <div id="imgsSlider" className='w-[100%] flex justify-between pt-6'>
          <img src="/Anker.jpg" className='size-21 rounded-lg' alt="" />
          <img src="/Anker.jpg" className='size-21 rounded-lg' alt="" />
          <img src="/Anker.jpg" className='size-21 rounded-lg' alt="" />
          <img src="/Anker.jpg" className='size-21 rounded-lg' alt="" />
        </div>
      </div>

      <div id='AddToCart' className="py-5 flex justify-between text-3xl gap-x-5 text-white font-[IniraBold]">

        <div id="increaseButton" className='px-5 flex items-center p-2 bg-[#242627] rounded-xl'>
          <h1 className='p-2 px-3 border-r-2 border-[#717172]'>{quantity}</h1>
          <button 
            className='p-2 px-3 rounded-xl cursor-pointer' 
            onClick={handleIncrease}
          >
            +
          </button>
        </div>

        <button 
          className='grow-1 bg-[#CB3134] text-3xl p-2 rounded-xl cursor-pointer'
          onClick={() => handleAddToCart(productId , quantity)}
          disabled={loading}
        >
          {loading ? (
            <div className="loader">
              <SyncLoader 
                color="white" 
                loading={true} 
                size={9} 
                margin={7}
                speedMultiplier={0.8}
              />
          </div>
          ) :
           addedToCart ? (
            "Added to Cart"
          ) : (
            "ADD TO CART"
          )}
        </button>

      </div>
    </div>
  );
}

export default ProductPreviewCard;
