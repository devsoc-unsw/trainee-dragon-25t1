import { useState } from 'react';

export const LoginPopup = () => {
	const [popup, setPopup] = useState(false); 
  const [closingPopup, setClosingPopup] = useState(false);
	const [profileData, setProfileData] = useState({
		email: "",
		password: ""
	})
	const closePopup = () => {
    setClosingPopup(true);
    setTimeout(() => {
      setPopup(false);
      setClosingPopup(false);
    }, 100);
  };

	const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

	const handleLogin = async () => {

	}

	return (
		<>
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
							Login to account
						</p>
						<input
							name="email"
							placeholder='Email'
							onChange={handleProfile}
							value={profileData.email}
							className="mb-3 w-[500px] p-2 py-3 border rounded text-sm mt-6"
          	/>

						<input
							name="password"
							type="password"
							placeholder='Password'
							onChange={handleProfile}
							value={profileData.password}
							className="mb-3 w-full p-2 py-3 border rounded text-sm"
						/>
					</div>
					<div className='flex flex-row justify-between items-end'>
              <button
                className='rounded-md w-[60px] h-[40px] bg-purple-600 px-3 mt-3 border-violet-500 text-white text-center font-semibold'
                onClick={handleLogin}
              >
                Submit
              </button>
					</div>
				</div>
			</div>
		
		</>
	)
}