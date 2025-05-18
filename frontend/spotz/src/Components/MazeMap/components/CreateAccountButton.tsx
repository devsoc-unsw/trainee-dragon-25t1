import { useNavigate } from 'react-router-dom';

export const RegisterAcc = () => {
  const navigate = useNavigate();
  return (
    <>
      <div 
        className='absolute flex flex-col justify-center items-center bg-white top-3 right-96 z-[999] w-[100px] h-[40px] rounded-full border hover:bg-black/15 cursor-pointer'
        onClick={() => navigate('/register')}
      > 
        <p className="text-black px-3 py-1 font-semibold text-center">
          Register
        </p>
      </div>
    </>
  );
};