import { FC, PropsWithChildren } from "react";

type SecondaryButtonType = PropsWithChildren<{
  className? : String,
  onMouseOver? : () => void,
  onMouseOut? : () => void,
  onClick? : () => void, 
}>

const SecondaryButton : FC<SecondaryButtonType> = ({className, onMouseOver, onMouseOut, onClick, children}) => {
  return (
    <button className={`${className} text-primary`} onMouseOut={onMouseOut} onMouseOver={onMouseOver} onClick={onClick}>
      {children}
    </button>
  );
};

export default SecondaryButton;