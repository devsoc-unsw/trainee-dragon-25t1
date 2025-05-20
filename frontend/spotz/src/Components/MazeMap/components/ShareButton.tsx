import React, { useRef, useEffect } from 'react';

interface SharePopupProps {
    isOpen: boolean;
    onClose: () => void;
    mapId: string;
    selectedRoomId?: string;
}

const SharePopup: React.FC<SharePopupProps> = ({ 
    isOpen, 
    onClose, 
    mapId, 
    selectedRoomId 
}) => {
    const popupRef = useRef<HTMLDivElement>(null);
  
    const generateShareLink = () => {
        const baseUrl = window.location.origin;
        let shareLink = `${baseUrl}/map/${mapId}`;
    
        if (selectedRoomId) {
            shareLink += `/room/${selectedRoomId}`;
        }
    
        return shareLink;
    };
  
    const copyToClipboard = () => {
        const link = generateShareLink();
        navigator.clipboard.writeText(link)
    };

  
    // Close popup when clicking outside the box
    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                    onClose();
                }
        };

        if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        }
            
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isOpen, onClose]);

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose}></div>
      <div 
        ref={popupRef}
        className="bg-white rounded-lg p-4 shadow-lg z-10 max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Share Link</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {selectedRoomId 
              ? 'Share this map and selected room:' 
              : 'Share this map:'}
          </p>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={generateShareLink()}
              className="flex-grow p-2 border border-gray-300 rounded-l-md text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;