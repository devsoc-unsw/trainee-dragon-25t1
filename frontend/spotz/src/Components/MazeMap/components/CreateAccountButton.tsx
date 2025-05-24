import { useState } from 'react';
import { registerUser } from '../../../Fetchers/RegisterFetch';
import { LoginPopup } from './LoginPopup';

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password);

export const RegisterAcc = ({ onClose, onSuccess }: {
  onClose?: () => void,
  onSuccess?: () => void
}) => {
  const [popup, setPopup] = useState(true); 
  const [closingPopup, setClosingPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'name') setNameError('');
    if (e.target.name === 'email') setEmailError('');
    if (e.target.name === 'password') setPasswordError('');
  };

  const handleRegister = async () => {
    let valid = true;

    if (profileData.name.length <= 1 || profileData.name.length > 100) {
      setNameError('Username must be between 2 and 100 characters');
      valid = false;
    }

    if (!validateEmail(profileData.email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (!validatePassword(profileData.password)) {
      setPasswordError('Password must contain an uppercase, lowercase, and a number');
      valid = false;
    }

    if (!valid) return;

    try {
      const res = await registerUser(profileData.name, profileData.email, profileData.password);
      if (res) {
        setPopup(false);
        onClose?.();
        onSuccess?.();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const closePopup = () => {
    setClosingPopup(true);
    setTimeout(() => {
      setPopup(false);
      setClosingPopup(false);
      onClose?.();
    }, 100);
  };

  if (!popup) return null;

  return (
    <>
      {popup &&
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/30 z-[1000]"
        onClick={closePopup}
        style={{
          animation: !closingPopup
            ? "fadeIn 0.1s ease-out forwards"
            : "fadeOut 0.1s ease-out forwards",
        }}
      >
        <div
          className="bg-white p-10 rounded-xl shadow-xl w-1/3 min-w-[600px] min-h-[300px] flex flex-col justify-start items-start"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: !closingPopup
              ? "fadeInScale 0.1s ease-out forwards"
              : "fadeOutScale 0.1s ease-out forwards",
          }}
        >
          <div className='flex flex-col'>
            <p className='font-semibold text-2xl'>
              Create an account
            </p>

            <input
              name="name"
              placeholder='Username'
              onChange={handleProfile}
              value={profileData.name}
              className="mb-3 w-[500px] p-2 py-3 border rounded text-sm mt-6"
            />
            {nameError && <p className="text-red-500 text-sm mb-2">{nameError}</p>}

            <input
              name="email"
              placeholder='Email'
              onChange={handleProfile}
              value={profileData.email}
              className="mb-3 w-full p-2 py-3 border rounded text-sm"
            />
            {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}

            <input
              name="password"
              type="password"
              placeholder='Password'
              onChange={handleProfile}
              value={profileData.password}
              className="mb-3 w-full p-2 py-3 border rounded text-sm"
            />
            {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}

            <div className='flex flex-row justify-between items-end'>
              <button
                className='rounded-md w-[60px] h-[40px] bg-purple-600 px-3 mt-3 border-violet-500 text-white text-center font-semibold'
                onClick={handleRegister}
              >
                Submit
              </button>
              <p 
                className='cursor-pointer underline text-purple-600 font-medium'
                onClick={() => setShowLoginPopup(true)}
              >
                Or if you already have an account, login here
              </p>
            </div>
          </div>
        </div>
      </div>
      }
      <LoginPopup 
        isOpen={showLoginPopup}
        onClose={() => {
          setShowLoginPopup(false);
          onClose?.();
        }}
        onBack={() => setShowLoginPopup(false)}
      />
    </>
  );
};
