import { FC } from "react";

type ChevronLeftIconType = {
  width: number,
  height: number,
  onClick?: () => void,
};

const ChevronLeftIcon: FC<ChevronLeftIconType> = ({ width = 24, height = 24, onClick }) => {
  return (
    <div className="cursor-pointer rounded-full hover:bg-slate-100" onClick={onClick}>
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18L9 12L15 6" stroke="#17183B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export default ChevronLeftIcon;