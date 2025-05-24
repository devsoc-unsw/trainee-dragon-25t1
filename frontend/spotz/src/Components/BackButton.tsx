import { useNavigate } from "react-router-dom";
import Back from "./icons/back";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="cursor-pointer z-[1001] absolute top-0 left-0 bg-white p-3 m-5 rounded-xl"
    >
      <Back />
    </div>
  );
};
