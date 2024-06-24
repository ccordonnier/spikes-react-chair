import { FC, PropsWithChildren } from "react";

type SecondaryButtonType = PropsWithChildren<{
  className? : String,
  onClick? : (id:number) => void,
}>

const PrimaryButton : FC<SecondaryButtonType> = ({className, onClick, children}) => {
  return (
    <button className={`${className} rounded bg-primary hover:bg-primary-hover text-white px-8 py-3`} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;