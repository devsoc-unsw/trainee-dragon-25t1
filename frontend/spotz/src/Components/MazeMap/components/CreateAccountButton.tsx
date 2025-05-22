import { useState } from 'react';
import { registerUser } from '../../../Fetchers/RegisterFetch';


export const RegisterAcc = () => {
  const [popup, setPopup] = useState(false);
  const [closingPopup, setClosingPopup] = useState(false);
  const [registerClose, setRegisterClose] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      console.log(profileData);
      const res = await registerUser(profileData.name, profileData.email, profileData.password);
      console.log(res);
      if (res) {
        setPopup(false);
        setRegisterClose(true);
      }
    }
    catch (error) {
      console.error("Error registering:", error);
    }
  }
  return (
    <>
      { !registerClose && ( <div 
        className='flex justify-center items-center bg-white right-96 z-[999] w-[100px] h-[40px] rounded-2xl border cursor-pointer'
        onClick={() => setPopup(true)}
      > 
        <p className="text-black px-3 py-1 font-semibold text-center text-base">
          Register
        </p>
      </div>)
      }

      {
        popup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 min-w-[750px] min-h-[650px] z-[1000]"
          onClick={() => {
            setTimeout(() => {
              setClosingPopup(false); // Unmount the popup after the animation ends
              setPopup(false); // Reset the closing state
            }, 100)
          }}
          style={{
            animation: !closingPopup
              ? "fadeIn 0.1s ease-out forwards"
              : "fadeOut 0.1s ease-out forwards",
          }}
        >
          <div className="bg-white p-10 rounded-xl shadow-xl w-1/3 min-w-[600px] min-h-[300px] flex flex-col justify-start items-start"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: !closingPopup
                ? "fadeInScale 0.1s ease-out forwards"
                : "fadeOutScale 0.1s ease-out forwards",
            }}
          >
            <div className='flex flex-col'>
              <p className='font-semibold text-2xl mb-7'>
                Create an account
              </p>
              <input
                name="name"
                placeholder='Username'
                onChange={handleProfile}
                value={profileData.name}
                className="mb-3 w-[500px] p-2 py-3 border rounded text-sm"
              />

              <input
                name="email"
                placeholder='Email'
                onChange={handleProfile}
                value={profileData.email}
                className="mb-3 w-full p-2 py-3 border rounded text-sm"
              />
               <input
                name="password"
                placeholder='Password'
                onChange={handleProfile}
                value={profileData.password}
                className="mb-3 w-full p-2 py-3 border rounded text-sm"
              />

              <button 
                className='rounded-3xl w-[60px] h-[40px] bg-purple-600 px-3 mt-3 border-violet-500 text-white text-center font-semibold'
                onClick={() => handleRegister()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        )
      }
    </>
  );
};