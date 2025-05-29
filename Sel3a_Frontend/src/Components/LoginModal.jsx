import React, { useState } from 'react';

function LoginModal({ isOpen, closeModal, setIsLoggedIn, setName, setCartCount }) {
  if (!isOpen) return null;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      
      const response = await fetch('http://localhost:5000/api/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: username, 
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed, please check your credentials');
      }
      const data = await response.json();
      const token = data.token;
      const name = data.fname;
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
  
      setIsLoggedIn(true);
      setName(name);

      const cartCountResponse = await fetch('http://localhost:5000/api/cart/count', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!cartCountResponse.ok) {
        throw new Error('Cart Count fetch failed');
      }

      const cartCount = await cartCountResponse.json();
      localStorage.setItem('cartCount', cartCount.cartItemsCount);
      setCartCount(cartCount.cartItemsCount); 

      closeModal();
    } catch (error) {
      setErrorMessage(error.message);
    } 
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000008a] pointer-events-auto">

      <div className="relative flex flex-col justify-between items-center bg-[#181818] text-white p-8 rounded-lg w-[400px]">

        <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:opacity-80 transition">
          <img src="/cancel.png" alt="Close" className="size-5" />
        </button>

        <img src="/Sel3aLogo.png" alt="Logo" className="w-32 mb-4" />

        <h2 className="text-2xl font-[IniraBold] mb-6">Login</h2>

        <form onSubmit={handleLogin} className="w-full flex flex-col items-center gap-y-4">
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent text-white placeholder-[#4C4C4C] border border-[#5C5F62] px-4 py-2 rounded-md focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent text-white placeholder-[#4C4C4C] border border-[#5C5F62] px-4 py-2 rounded-md focus:outline-none"
          />

          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
          <button
            type="submit"
            className="w-full bg-[#4DC161] text-white py-2 rounded-md font-[IniraBold] focus:outline-none hover:bg-[#5FD47E] transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
