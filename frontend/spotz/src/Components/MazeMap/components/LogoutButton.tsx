import Logout from '../../icons/logout';
import { useState } from 'react';
import { logoutUser } from '../../../Fetchers/LogoutFetch';
import Cookies from 'js-cookie';

export const LogoutButton = () => {
	const [popup, setPopup] = useState(false); 
  const [closingPopup, setClosingPopup] = useState(false);

	const closePopup = () => {
    setClosingPopup(true);
    setTimeout(() => {
      setPopup(false);
      setClosingPopup(false);
    }, 100);
  };

	const handleLogout = async () => {
		try {
			const res = await logoutUser();
			if (res) {
				Cookies.remove("sessionId")
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<>
			<Logout onClick={() => setPopup(true)}>
			</Logout>	
		
			{ popup &&
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
						className="flex flex-row justify-between items-center bg-white p-10 rounded-xl shadow-xl w-[350px] min-h-[20px]"
						onClick={(e) => e.stopPropagation()}
						style={{
							animation: !closingPopup
								? "fadeInScale 0.1s ease-out forwards"
								: "fadeOutScale 0.1s ease-out forwards",
						}}
					>
						<p className='flex text-lg font-medium'>
							Are you sure you want to logout?
						</p>
					  <button
              className='rounded-md w-[60px] h-[40px] bg-purple-600 px-3 mt-3 border-violet-500 text-white text-center font-semibold'
              onClick={handleLogout}
            >
              Yes
            </button>
					</div>
				</div>
			}
		</>
	)
}