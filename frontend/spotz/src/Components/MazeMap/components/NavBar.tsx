import { useState } from 'react';
import Menu from '../../icons/menu';
import Share from '../../icons/share';
import History from '../../icons/history';
import Tab from '../../icons/tab';
import Profile from '../../icons/prof';
import Add from '../../icons/Add';
import Setting from '../../icons/Settings';
import { LogoutButton } from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SharePopup from './SharePopup';
import { HistoryPopup } from './HistoryPopup';
import { RegisterAcc } from './CreateAccountButton';

interface NavBar {
    mapRef: any;
    selectedRoomId?: string;
}

export const NavBar: React.FC<NavBar> = ({ mapRef, selectedRoomId }) => {
	const [threeD, useThreeD] = useState(false);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [register, setShowRegister] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleIconClick = (iconName: string, action?: () => void) => {
    setActiveIcon(activeIcon === iconName ? null : iconName);
    if (action) action();
  };
	const [expand, setExpand] = useState(false);
	return (
			<>
				<div
					className={`flex flex-col justify-between py-6 absolute left-4 top-[130px] z-[999] h-[600px] 
						bg-white rounded-3xl duration-300 ease-in-out 
						${expand ? 'w-[300px] items-start justify-start p-7' : 'w-[60px] items-center'}`}
				>	
					{
						expand && 
						<div className="w-full flex justify-center mt-7">
							<p className="text-center font-semibold text-xl">Features</p>
						</div>
					}
					<div className={`flex flex-col w-full	${expand ? 'items-start' : 'items-center'}`}>
						<button
							className={`flex flex-row justify-center items-center gap-3 py-3 px-3 text-2xl font-medium cursor-pointer rounded-lg p-2 ${
								threeD ? 'bg-purple-600 text-white' : 'bg-white text-black hover:bg-gray-100'
						}`}
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
						<div 
							className={`flex flex-row py-3 cursor-pointer rounded-lg px-3 ${
								activeIcon === 'menu' ? 'bg-purple-600' : 'hover:bg-gray-100'
							}`}
							onClick={() => {handleIconClick('menu'), setExpand(!expand)}}
						>
							<Menu fill={activeIcon === 'menu' ? '#ffffff' : '#1f1f1f'} />
						</div>

						<div 
							className={`flex items-center cursor-pointer rounded-lg px-3 py-3 ${
								activeIcon === 'tab' ? 'bg-purple-600' : 'hover:bg-gray-100'
							} ${expand ? 'justify-between w-full' : 'justify-center'}`}

							onClick={() => handleIconClick('tab')}
						>
							<Tab fill={activeIcon === 'tab' ? '#ffffff' : '#1f1f1f'} />
							{expand && <p className='font-medium'>Add a Bookmark</p>}
						</div>

						<div 
							className={`flex items-center cursor-pointer rounded-lg py-3 px-3 ${
								activeIcon === 'history' ? 'bg-purple-600' : 'hover:bg-gray-100'
							} ${expand ? 'justify-between w-full' : 'justify-center'}`}
							onClick={() => handleIconClick('history')}
						>
							<History fill={activeIcon === 'history' ? '#ffffff' : '#1f1f1f'} />
							{expand && <p className='font-medium'>Recent History</p>}
						</div>

						<div 
							className={`flex items-center cursor-pointer rounded-lg py-3 px-3 ${
								activeIcon === 'share' ? 'bg-purple-600' : 'hover:bg-gray-100'
							} ${expand ? 'justify-between w-full' : 'justify-center'}`}
							onClick={() => handleIconClick('share', () => setIsSharePopupOpen(true))}
						>
							<Share fill={activeIcon === 'share' ? '#ffffff' : '#1f1f1f'} />
							{expand && <p className='font-medium'>Share a link</p>}
						</div>
					</div>

					<div className={`flex flex-col w-full ${expand ? 'items-start' : 'items-center'}`}>
					<div 
							className={`flex items-center cursor-pointer rounded-lg px-3 py-3 ${
								activeIcon === 'add' ? 'bg-purple-600' : 'hover:bg-gray-100'
							} ${expand ? 'justify-between w-full' : 'justify-center'}`}
							onClick={() => handleIconClick('add')}
						>
							<Add fill={activeIcon === 'add' ? '#ffffff' : '#1f1f1f'} />
							{
								expand &&
								<p className='text-pretty font-medium'>
									Reccomend a Spot
								</p>
							}
						</div>

						<div 
							className={`flex items-center cursor-pointer rounded-lg px-3 py-3 ${
								activeIcon === 'settings' ? 'bg-purple-600' : 'hover:bg-gray-100'
							} ${expand ? 'justify-between w-full' : 'justify-center'}`}
							onClick={() => handleIconClick('settings')}
						>
							<Setting fill={activeIcon === 'settings' ? '#ffffff' : '#1f1f1f'} />
							{
								expand &&
								<p className='text-pretty font-medium'>
									Settings
								</p>
							}
						</div>
					</div>

					<div className='flex flex-col gap-2'>
						<div 
							className={`flex flex-row justify-center items-center gap-5 py-3 cursor-pointer rounded-lg p-2 ${
								activeIcon === 'profile' ? 'bg-purple-600' : 'hover:bg-gray-100'
							}`}
							onClick={() => {
								handleIconClick('profile');
								{
									Cookies.get("sessionId")
									? navigate("/profile")
									: setShowRegister(true);
								}
							}}
						>
							<Profile fill={activeIcon === 'profile' ? '#ffffff' : '#1f1f1f'} />
							{
								expand &&
								<p className='text-pretty font-medium'>
									Profile
								</p>
							}
						</div>
						{Cookies.get("sessionId") && (
							<div className='hover:bg-gray-100 rounded-lg p-2 flex flex-row justify-center items-center gap-5'>
									<LogoutButton />
									{
										expand &&
										<p className='text-pretty font-medium'>
											Logout
										</p>
									}
							</div>
						)}
					</div>
					{register && <RegisterAcc onClose={() => setShowRegister(false)} />}
				</div>
				<SharePopup
					isOpen={isSharePopupOpen}
					onClose={() => {
						setIsSharePopupOpen(false);
						setActiveIcon(null);
					}}
					selectedRoomId={selectedRoomId}
				/>
		</>
	);
};