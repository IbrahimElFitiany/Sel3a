import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginModal from '@components/LoginModal';
import RegisterModal from '@components/RegisterModal';
import UserDropdown from '@components/UserDropdown';

function AuthButtons({ openLogin, openRegister }) {
  return (
    <div className="flex font-[IniraBold] text-white space-x-5">

      <button className="cursor-pointer" onClick={openLogin}>
        <span className="">Login</span>
      </button>

      <button className="cursor-pointer" onClick={openRegister}>
        <span className="text-white">Register</span>
      </button>

    </div>
  );
}


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);
      setName(localStorage.getItem('name'));
      setCartCount(localStorage.getItem('cartCount'));
    } 
    else setIsLoggedIn(false);
  }, []);

  const openLogin = () => setIsModalOpen(true);
  const closeModal = () =>setIsModalOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  return (
    <header className="py-2 pt-5 px-40 w-[100%] border-b-1 border-[#242627] text-white flex items-center justify-between">

      {/* Logo */}
      <div className="flex justify-center items-center w-28 pl-2">
        <Link to="/" className="cursor-pointer">
          <img src="/Sel3aLogo.png" alt="Logo" />
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center w-[60%] bg-[#242627] py-1.5 px-4 rounded-full font-semibold">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="flex-1 bg-transparent text-white placeholder-[#4C4C4C] px-4 py-2 focus:outline-none"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img src="/Search.png" alt="Search" className="size-6 mx-2" />
      </div>


      {/* Buttons */}
      <div className="flex space-x-9 text-l">
        {isLoggedIn ? (
          <>
            {/* User Info */}
            <div className="flex justify-center items-center space-x-2 font-[IniraReg] text-[#8D9291]">
              <UserDropdown name={name} setIsLoggedIn={setIsLoggedIn} />
            </div>


            {/* wishlist */}
            <button className="bg-transparent">
              <Link to="/wishlist" className="cursor-pointer">
                <img className="size-7" src="/heart 1.png" alt="Wishlist" />
              </Link>
            </button>

            {/* shopping cart */}
            <button className="relative bg-transparent">

              <Link to="/cart" className="cursor-pointer">
                <img className="size-7" src="/shopping-cart 1.png" alt="Cart" />
              </Link>
              <span className="absolute -top-1 -right-1 bg-[#5FD47E] font-[IniraReg] text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </button>
          </>
        ) : (
          <AuthButtons openLogin={openLogin} openRegister={openRegister} />
        )}
      </div>

      <LoginModal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        setIsLoggedIn={setIsLoggedIn}
        setName={setName}
        setCartCount={setCartCount}
      />

      <RegisterModal 
        isOpen={isRegisterOpen} 
        closeModal={closeRegister} 
        setIsLoggedIn={setIsLoggedIn}
        setName={setName}
        setCartCount={setCartCount}
      />


    </header>
  );
}

export default Header;
