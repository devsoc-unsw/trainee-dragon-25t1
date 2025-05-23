import { useState } from 'react';
import Menu from '../../icons/menu';
import Share from '../../icons/share';
import History from '../../icons/history';
import Tab from '../../icons/tab';
import Profile from '../../icons/prof';
import Add from '../../icons/Add';
import Setting from '../../icons/Settings';
import { useNavigate } from 'react-router-dom';
import SharePopup from './SharePopup';

interface NavBar {
    mapRef: any;
	selectedRoomId?: string;
}


export const NavBar: React.FC<NavBar> = ({ mapRef, selectedRoomId}) => {
	const [threeD, useThreeD] = useState(false);
	const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
	const navigate = useNavigate();

	// TODO
	// Add Routes/Popups for Settings Page/Popup and Account Page/Popup
	// Add Popup for adding spots
	// Add Popup for sharing link
	const handleShareClick = () => {
		setIsSharePopupOpen(true);
	};

	const handleCloseSharePopup = () => {
		setIsSharePopupOpen(false);
	};

  return (
    <>
			<div className='flex flex-col justify-between items-center py-6 absolute left-4 top-[130px] z-[999] h-[600px] w-[60px] bg-white rounded-3xl'>
				<div className='flex flex-col items-center gap-2'>

				
				<button
						className="flex flex-col bg-white text-2xl text-black cursor-pointer font-medium
									hover:bg-gray-100 rounded-lg p-2"
						onClick={() => {
						useThreeD(!threeD);
						if (!threeD) {
								mapRef.current.enable3d({ animateWalls: true, show3dAssets: true });
								mapRef.current.setPitch(56.8);
								mapRef.current.setBearing(-28.8);
						} else {
								mapRef.current.disable3d();
								mapRef.current.setPitch(0);
								mapRef.current.setBearing(0);
						}
						}}
				>
						3D
				</button>
				<div className='flex flex-col py-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
					<Menu>

					</Menu>
				</div>
				<div className='flex flex-col py-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
					<Tab>

					</Tab>
				</div>
				<div className='flex flex-col py-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
					<History>
						
					</History>
				</div>
				<div className='flex flex-col py-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2' 
					onClick={handleShareClick}>
					<Share></Share>
				</div>
			</div>
		

			<div className="flex flex-col items-center gap-2">
				<div className='flex flex-col py-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
						<Add>

						</Add>
				</div>
				<div className='flex flex-col py-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
					<Setting>

					</Setting>
				</div>
				</div>
				<div className='flex flex-col py-0.5 cursor-pointer hover:bg-gray-100 rounded-lg p-2'>
					<div
						className="flex flex-col py-2 cursor-pointer"
						onClick={() => navigate('/profile')}
					>
						<Profile></Profile>
						</div>
					</div>
				</div>


				<SharePopup
					isOpen={isSharePopupOpen}
					onClose={handleCloseSharePopup}
					selectedRoomId={selectedRoomId}
				/>
    </>
  );
};
