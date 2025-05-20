import { ReactNode } from "react";

interface ActionCard {
  children?: any;
  icon: ReactNode;
  name: string;
}

export const ActionCard: React.FC<ActionCard> = ({ children, icon, name }) => {
  return (
    <div className="border-solid border-black border-2 rounded-2xl flex m-[20px] flex-col items-center w-full py-5">
      <div className="w-48 h-48"> 
        {icon}
      </div>
      <div className="text-4xl my-[10px]">{name}</div>
      {children}
    </div>
  );
};
