import { useState } from 'react';

interface ThreeDButtonProps {
  mapRef: any;
}

export const ThreeDButton: React.FC<ThreeDButtonProps> = ({ mapRef }) => {
  const [threeD, useThreeD] = useState(false);
  return (
    <>
      <button
        className="absolute top-1/3 z-[999] size-14 bg-purple-700 rounded-full left-3 text-2xl text-white"
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
    </>
  );
};
