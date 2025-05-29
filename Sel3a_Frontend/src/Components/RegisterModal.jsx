import React, { useState } from 'react';

function RegisterModal({ isOpen, closeModal}) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        phone: '',
        gender: 'm',
        birthday: '',
    });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/customer/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Registration failed');

        setSuccessMessage('Registered successfully!');
        setErrorMessage('');
        closeModal();

    } 
    catch (err) {
      setErrorMessage(err.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex flex-col items-center justify-center bg-[#0000008a] pointer-events-auto">
      <div className="relative flex flex-col justify-between items-center bg-[#181818] text-white p-8 rounded-lg w-[400px]">
        <button onClick={closeModal} className="absolute top-4 right-4 text-white hover:opacity-80 transition">
          <img src="/cancel.png" alt="Close" className="size-5" />
        </button>

        <img src="/Sel3aLogo.png" alt="Logo" className="w-32 mb-4" />

        <h2 className="text-2xl font-[IniraBold] mb-6">Register</h2>

        <form onSubmit={handleRegister} className="w-full flex flex-col items-center gap-y-4">

          <input name="fname" placeholder="First Name" value={formData.fname} onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-[#4C4C4C] border border-[#5C5F62] px-4 py-2 rounded-md focus:outline-none" />

          <input name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-[#4C4C4C] border border-[#5C5F62] px-4 py-2 rounded-md focus:outline-none" />

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-[#4C4C4C] border border-[#5C5F62] px-4 py-2 rounded-md focus:outline-none" />

          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-[#4C4C4C] border border-[#5C5F62] px-4 py-2 rounded-md focus:outline-none" />

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
            className="w-full bg-transparent text-white placeholder-[#4C4C4C] border border-[#5C5F62] px-4 py-2 rounded-md focus:outline-none" />

          <div className="w-full flex items-center justify-start gap-x-4 text-[#aaa] text-sm">
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="m" checked={formData.gender === 'm'} onChange={handleChange} />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="f" checked={formData.gender === 'f'} onChange={handleChange} />
              <span>Female</span>
            </label>
          </div>

          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange}
            className="w-full bg-transparent text-white border border-[#5C5F62] px-4 py-2 rounded-md focus:outline-none" />

          {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
          {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}

          <button type="submit"
            className="w-full bg-[#4DC161]  text-white py-2 rounded-md font-[IniraBold] focus:outline-none hover:bg-[#5FD47E] transition duration-200">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
