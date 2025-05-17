import { useEffect, useRef, useState } from 'react';


interface NavBar {
    mapRef: any;
}

export const NavBar: React.FC<NavBar> = ({ mapRef }) => {
	const [threeD, useThreeD] = useState(false);
  return (
    <>
			<div className='flex flex-col justify-top items-center py-6 absolute left-4 top-[130px] flex z-[999] h-[600px] w-[66px] bg-white rounded-3xl'>
				<div>
					<button
							className="flex flex-col size-14 bg-white rounded-full left-3 text-2xl text-black"
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
				</div>
			</div>
    </>
  );
};