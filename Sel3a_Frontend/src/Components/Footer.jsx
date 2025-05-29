import React from 'react';

function Footer() {
  return (
    <footer className="flex flex-col w-[100%] mx-auto bg-transparent text-white py-4 px-4 border-t-1 border-[#242627]">

      <div className='px-30 flex justify-between'>

        {/*Logo & Socials*/}
        <div className="flex flex-col gap-y-3 items-center justify-center space-x-4 mb-10">
          <img className="w-35" src="/Sel3aLogo.png" alt="Sufra Logo" />
          <h1 className='font-semibold'>Stay in touch with us</h1>

          {/* Socials */}
          <div id="socials" className='w-full flex space-x-4 mt-3'>

            <a href="https://www.youtube.com/Sel3a" target="_blank" rel="noopener noreferrer">
              <img src="/Youtube.png" alt="Youtube" className="size-7" />
            </a>

            <a href="https://www.facebook.com/Sel3a" target="_blank" rel="noopener noreferrer">
              <img src="/Facebook.png" alt="Facebook" className="size-7" />
            </a>

            <a href="https://www.instagram.com/Sel3a" target="_blank" rel="noopener noreferrer">
              <img src="/Instagram.png" alt="Instagram" className="size-7" />
            </a>

            <a href="https://www.twitter.com/Sel3a" target="_blank" rel="noopener noreferrer">
              <img src="/Twitter.png" alt="Twitter" className="size-7" />
            </a>
          </div>      
        </div>


        {/* Navigation Links */}
        <div className="flex py-2 gap-x-8 font-semibold justify-evenly text-sm  mb-10 borderb-1 [#B68D67]">
            <a href="#">About US</a>
            <a href="#">Customer service </a>
            <a href="#">Help & Support</a>
            <a href="#">Sell with Us</a>
        </div>

      </div>

      {/* Footer Bottom Line */}
      <div className="pt-4 text-center text-sm text-gray-400">
             © {new Date().getFullYear()} <span className=" text-gray-400">Sel3a</span>. All rights reserved.
            <br className="md:hidden" />
            <span className="block md:inline"> Developed by <span className="text-white font-medium"> Ibrahim Taha</span>.</span>
        </div>
    </footer>
  );
}

export default Footer;
