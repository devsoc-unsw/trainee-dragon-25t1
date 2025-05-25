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

interface NavBar {
    mapRef: any;
    selectedRoomId?: string;
}

export const NavBar: React.FC<NavBar> = ({ mapRef, selectedRoomId }) => {
    const [threeD, useThreeD] = useState(false);
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
    const [activeIcon, setActiveIcon] = useState<string | null>(null);
    const [isHistoryPopupOpen, setIsHistoryPopupOpen] = useState(false);
    const navigate = useNavigate();

    const handleIconClick = (iconName: string, action?: () => void) => {
        setActiveIcon(activeIcon === iconName ? null : iconName);
        if (action) action();
    };

    return (
        <>
            <div className='flex flex-col justify-between items-center py-6 absolute left-4 top-[130px] z-[999] h-[600px] w-[60px] bg-white rounded-3xl'>
                <div className='flex flex-col'>
                    <button
                        className={`text-2xl font-medium cursor-pointer rounded-lg p-2 ${
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
                        className={`flex flex-col py-3 cursor-pointer rounded-lg p-2 ${
                            activeIcon === 'menu' ? 'bg-purple-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleIconClick('menu')}
                    >
                        <Menu fill={activeIcon === 'menu' ? '#ffffff' : '#1f1f1f'} />
                    </div>

                    <div 
                        className={`flex flex-col py-3 cursor-pointer rounded-lg p-2 ${
                            activeIcon === 'tab' ? 'bg-purple-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleIconClick('tab')}
                    >
                        <Tab fill={activeIcon === 'tab' ? '#ffffff' : '#1f1f1f'} />
                    </div>

                    <div 
                        className={`flex flex-col py-3 cursor-pointer rounded-lg p-2 ${
                            activeIcon === 'history' ? 'bg-purple-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => {
                            setIsHistoryPopupOpen(true);
                            handleIconClick('history')
                        }}
                    >
                        <History fill={activeIcon === 'history' ? '#ffffff' : '#1f1f1f'} />
                    </div>

                    <div 
                        className={`flex flex-col py-3 cursor-pointer rounded-lg p-2 ${
                            activeIcon === 'share' ? 'bg-purple-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleIconClick('share', () => setIsSharePopupOpen(true))}
                    >
                        <Share fill={activeIcon === 'share' ? '#ffffff' : '#1f1f1f'} />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div 
                        className={`flex flex-col py-3 cursor-pointer rounded-lg p-2 ${
                            activeIcon === 'add' ? 'bg-purple-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleIconClick('add')}
                    >
                        <Add fill={activeIcon === 'add' ? '#ffffff' : '#1f1f1f'} />
                    </div>

                    <div 
                        className={`flex flex-col py-3 cursor-pointer rounded-lg p-2 ${
                            activeIcon === 'settings' ? 'bg-purple-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => handleIconClick('settings')}
                    >
                        <Setting fill={activeIcon === 'settings' ? '#ffffff' : '#1f1f1f'} />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div 
                        className={`flex flex-col py-3 cursor-pointer rounded-lg p-2 ${
                            activeIcon === 'profile' ? 'bg-purple-600' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => {
                            handleIconClick('profile');
                            navigate('/profile');
                        }}
                    >
                        <Profile fill={activeIcon === 'profile' ? '#ffffff' : '#1f1f1f'} />
                    </div>

                    {Cookies.get("sessionId") && (
                        <div className='hover:bg-gray-100 rounded-lg p-2'>
                            <LogoutButton />
                        </div>
                    )}
                </div>
            </div>

            <SharePopup
                isOpen={isSharePopupOpen}
                onClose={() => {
                    setIsSharePopupOpen(false);
                    setActiveIcon(null);
                }}
                selectedRoomId={selectedRoomId}
            />

            <HistoryPopup
                isOpen={isHistoryPopupOpen}
                onClose={() => {
                    setIsHistoryPopupOpen(false);
                    setActiveIcon(null);
            }}
        />
        </>
    );
};