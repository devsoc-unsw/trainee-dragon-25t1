import React, { useState, useRef, useEffect } from 'react';
import Menu from '../../icons/menu'
import Share from '../../icons/share'
import History from '../../icons/history'
import Tab from '../../icons/tab'
import Profile from '../../icons/prof'
import Add from '../../icons/Add'
import Setting from '../../icons/Settings'
import SharePopup from './SharePopup';


interface NavBar {
    mapRef: any;
	selectedRoomId?: string;
}


export const NavBar: React.FC<NavBar> = ({ mapRef, selectedRoomId }) => {
	const [threeD, useThreeD ] = useState(false);
	const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);


	// TODO
	// Add Routes/Popups for Settings Page/Popup and Account Page/Popup
	// Add Popup for adding spots
	// Add Popup for sharing link - pierre

	const handleShareClick = () => {
		setIsSharePopupOpen(true);
	};

	const handleCloseSharePopup = () => {
		setIsSharePopupOpen(false);
	};
		
	return (
		<>
				<div className='flex flex-col justify-between items-center py-6 absolute left-4 top-[130px] z-[999] h-[600px] w-[60px] bg-white rounded-3xl'>
					<div className='flex flex-col'>

					
					<button
							className="flex flex-col bg-white text-2xl text-black cursor-pointer font-medium"
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
					<div className='flex flex-col py-3 cursor-pointer'>
						<Menu>

						</Menu>
					</div>
					<div className='flex flex-col py-3 cursor-pointer'>
						<Tab>

						</Tab>
					</div>
					<div className='flex flex-col py-3 cursor-pointer'>
						<History>
							
						</History>
					</div>
					<div className='flex flex-col py-3 cursor-pointer' onClick={handleShareClick}>
						<Share>
						</Share>
					</div>
					</div>

					<div className='flex flex-col'>
						<div className='flex flex-col py-3 cursor-pointer'>
							<Add>

							</Add>
						</div>
						<div className='flex flex-col py-3 cursor-pointer'>
							<Setting>

							</Setting>
						</div>
					</div>
					<div className='flex flex-col'>
						<div className='flex flex-col py-3 cursor-pointer'>
								<Profile>

								</Profile>
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