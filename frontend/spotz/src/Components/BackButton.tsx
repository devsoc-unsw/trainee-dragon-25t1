import { useNavigate } from "react-router-dom";
import Back from "./icons/back";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="cursor-pointer absolute text-4xl bg-gray-200 p-5 m-5 rounded-2xl"
    >
      <Back />
    </div>
  );
};
