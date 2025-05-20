interface ProfileCard {
  img: string;
  name: string;
  email: string;
}

export const ProfileCard: React.FC<ProfileCard> = ({ img, name, email }) => {
  return (
    <div className="bg-white flex flex-col justify-center items-center w-[70%] h-full px-[10%]">
          <div className="flex">
            <p className="text-black font-bold text-5xl m-5">Profile</p>
          </div>
          <div className="flex text-6xl mb-2">{name}</div>
          <div className="flex">
            <img
              src={img}
              className="w-56 h-56 rounded-full m-5"
            />
          </div>
          <div className="flex text-4xl">{email}</div>
        </div>
  );
};