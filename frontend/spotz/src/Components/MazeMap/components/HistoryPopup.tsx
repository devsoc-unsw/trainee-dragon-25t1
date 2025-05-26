import { useEffect, useRef, useState } from 'react';

interface GeoSpot {
  lngLat: { lat: number; lng: number };
  zLevel: number;
  roomName?: string;
  imageUrl?: string;
}

interface HistoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryPopup: React.FC<HistoryPopupProps> = ({ isOpen, onClose }) => {
  const [closingPopup, setClosingPopup] = useState(false);
  const [history, setHistory] = useState<GeoSpot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const popupRef = useRef<HTMLDivElement>(null);

  const closePopup = () => {
    setClosingPopup(true);
    setTimeout(() => {
      onClose();
      setClosingPopup(false);
    }, 100);
  };

  // Fetch history when popup opens
  useEffect(() => {
    if (isOpen) {
      fetchHistory();
    }
  }, [isOpen]);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Check if user is logged in first
      const sessionCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('sessionId='));
      
      if (!sessionCookie) {
        setError('Please log in to view your history');
        setIsLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/location/studyspot/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'session': sessionCookie.split('=')[1],
        },
        credentials: 'include',
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setHistory(data);
    } catch (err: any) {
      console.error('Full error:', err);
      if (err.message.includes('<!DOCTYPE')) {
        setError('Server error - please try again later');
      } else {
        setError(err.message || 'Failed to load history');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
      
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Generate room name from coordinates if not provided - FOR FUTURE IMPLEMENT THE ROOMNAME FROM MAZE API
  const getRoomName = (spot: GeoSpot) => {
    if (spot.roomName) return spot.roomName;
    return `Room at ${spot.lngLat.lat.toFixed(4)}, ${spot.lngLat.lng.toFixed(4)}`;
  };

  // Handle room click
  const handleRoomClick = (spot: GeoSpot) => {
    console.log('Navigate to room:', spot);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/30 z-[1000]"
        style={{
          animation: !closingPopup
            ? "fadeIn 0.1s ease-out forwards"
            : "fadeOut 0.1s ease-out forwards",
        }}
      >
        <div
          ref={popupRef}
          className="bg-white p-6 rounded-xl shadow-xl w-2/3 max-w-4xl max-h-[80vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: !closingPopup
              ? "fadeInScale 0.1s ease-out forwards"
              : "fadeOutScale 0.1s ease-out forwards",
          }}
        >
          <div className='flex justify-between items-center mb-6'>
            <h2 className='font-semibold text-2xl text-gray-800'>
              Your Study Spot History
            </h2>
            <button 
              onClick={closePopup}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="text-gray-500">Loading your history...</div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-40">
                <div className="text-red-500">{error}</div>
              </div>
            ) : history.length === 0 ? (
              <div className="flex items-center justify-center h-40 text-center">
                <div className="text-gray-500 max-w-md">
                  <div className="text-lg mb-2">nothing to see here... yet</div>
                  <p>No spotz currently in your history. Feel free to explore different study spotz for them to be added to history!</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((spot, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                    onClick={() => handleRoomClick(spot)}
                  >
                    <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {spot.imageUrl ? (
                        <img 
                          src={spot.imageUrl} 
                          alt={getRoomName(spot)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span className="text-xs">No Image</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800 truncate mb-1">
                        {getRoomName(spot)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Level {spot.zLevel}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {spot.lngLat.lat.toFixed(4)}, {spot.lngLat.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {history.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Showing {history.length} recent study spot{history.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};