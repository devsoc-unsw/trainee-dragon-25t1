import { useEffect, useRef, useState } from "react";
import { profileFetch } from "../../Fetchers/ProfileFetch";
import { profileEdit } from "../../Fetchers/ProfileEditFetch";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
}

export const DetailsPopup: React.FC<LoginPopupProps> = ({
  isOpen,
  onClose,
  onBack,
}) => {
  const [closingPopup, setClosingPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [profileData, setProfileData] = useState({
    email: "",
    name: "",
  });

  const closePopup = () => {
    setClosingPopup(true);
    setTimeout(() => {
      onClose();
      setClosingPopup(false);
    }, 100);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      closePopup();
    }
  };

  const handleProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleEdit = async () => {
    try {
      const res = await profileFetch();
      if (res) {
        await profileEdit(
          profileData.name ? profileData.name : res.data.name,
          [],
          [],
          [],
          [],
          profileData.email ? profileData.email : res.data.email,
          res.data.password
        );
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
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
          className="bg-white p-10 rounded-xl shadow-xl w-1/3 min-w-[600px] min-h-[240px] flex flex-col justify-start items-start"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: !closingPopup
              ? "fadeInScale 0.1s ease-out forwards"
              : "fadeOutScale 0.1s ease-out forwards",
          }}
        >
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center mb-7">
              <p className="font-semibold text-2xl">Set Account Details</p>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <input
              name="name"
              placeholder="New Name"
              onChange={handleProfile}
              value={profileData.name}
              className="mb-3 w-full p-2 py-3 border rounded text-sm"
            />

            <input
              name="email"
              placeholder="New Email"
              onChange={handleProfile}
              value={profileData.email}
              className="mb-3 w-full p-2 py-3 border rounded text-sm"
            />
          </div>

          <div className="flex flex-row justify-between items-end w-full">
            <button
              className="rounded-md w-[60px] h-[40px] bg-purple-600 px-3 mt-3 border-violet-500 text-white text-center font-semibold"
              onClick={handleEdit}
            >
              Submit
            </button>

            <button
              className="rounded-md px-4 h-[40px] bg-gray-200 mt-3 text-gray-700 text-center font-medium hover:bg-gray-300 transition-colors"
              onClick={handleBack}
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
