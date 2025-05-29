import { useState, useEffect, useRef } from 'react';

function UserDropdown({ name, setIsLoggedIn }) {

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative font-[IniraReg] text-[#8D9291]">

      <button onClick={toggleMenu} className="flex items-center space-x-2 text-white hover:text-[#5FD47E]">
        <h1 className="text-lg text-[#929796]">Hello <span className="text-white">{name}</span></h1>
        <img src="/arrow-down.png" alt="Dropdown Arrow" className="size-4 hover:brightness-110 hover:size-5 transition-all duration-200" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-[#242627] border border-[#333] rounded-md shadow-lg z-50">
          
          {/* Notch placed *before* the menu with lower z-index */}
          <div className="absolute -top-2 right-4 w-4 h-4 bg-[#242627] rotate-45 border-l border-t border-[#333] z-40"></div>

          {/* Menu content */}
          <div className="relative z-50">

            <button className="flex justify-start items-center w-full gap-x-5 px-5 py-2 text-white hover:bg-[#3a3d3c]">
              <img src="/order.png" className='size-6' alt="" />
              <h1 className='text-lg font-[IniraBold]'>Orders</h1>
            </button>

            <button className="flex justify-start items-center w-full gap-x-5 px-5 py-2 text-white hover:bg-[#3a3d3c]">
              <img src="/wallet.png" className='size-5' alt="" />
              <h1 className='text-lg font-[IniraBold]'>Payment</h1>
            </button>

            
            <button className="flex justify-start items-center w-full gap-x-5 px-5 py-2 text-white hover:bg-[#3a3d3c]">
              <img src="/user.png" className='size-5' alt="" />
              <h1 className='text-lg font-[IniraBold]'>Profile</h1>
            </button>

            <button className="flex justify-start items-center w-full gap-x-5 px-5 py-2 text-white hover:bg-[#3a3d3c]" onClick={handleLogout}>
              <img src="/log-out.png" className='size-5' alt="" />
              <h1 className='text-lg font-[IniraBold]'>Logout</h1>
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
