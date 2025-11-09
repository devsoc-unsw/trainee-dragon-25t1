interface TopBarButtonProps {
  label: React.ReactNode;
  classNames: string;
  children?: any;
  onClick: any;
}

export const TopBarButton: React.FC<TopBarButtonProps> = ({
  label,
  classNames,
  children,
  onClick,
}) => {
  return (
    <>
      <button
        className={`flex flex-grow py-2 items-center justify-center text-center gap-2
          bg-white rounded-full border font-medium hover:bg-black/15 min-w-[40px] sm: w-[40px] ${classNames}`}
        onClick={onClick}
      >
        {children && children}
        {label}
      </button>
    </>
  );
};
