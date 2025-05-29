import React from 'react';

function BranchCard({ city, area, address, stock }) {
  const isOutOfStock = stock === 0;

  return (
    <button className='cursor-pointer' onClick={() => alert(`Selected branch: ${city}, ${area}`)}>
      <div
        id="branch"
        className={`w-full p-3 m-1 rounded-xl flex justify-between transition-all
          ${isOutOfStock 
            ? 'border-2 border-[#B22121] bg-transparent text-[#B22121]' 
            : 'bg-[#242627] text-white'}
        `}
      >
        <div id="BranchDetails" className="flex flex-col justify-center items-start gap-y-1">
          <h1 className="text-2xl">{`${city}.${area}`}</h1>

          <div className="text-sm text-inherit text-left">
            <h1>Address:</h1>
            <h1>{address}</h1>
          </div>
        </div>

        <div id="Stock" className="w-[30%] flex flex-col gap-y-2 justify-center items-center">
          <h1 className="text-4xl">{stock}</h1>
          <h1 className={isOutOfStock ? 'text-[#B22121]' : 'text-[#5FD47E]'}>
              IN STOCK
          </h1>
        </div>
      </div>
    </button>

  );
}

export default BranchCard;
