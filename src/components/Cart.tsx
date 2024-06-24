import React from "react";
import { motion } from "framer-motion";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import TrashIcon from "./icons/TrashIcon";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

type ItemType = {
  id: number,
  src: string,
  name: string,
  quantity: number,
  price: number,
}

type CartType = {
  items: ItemType[] | [],
  emptyCart: () => void,
}

const TotalCount = (items: ItemType[]) => {
  var total = 0;
  for (let item of items) {
    total = + item.price * item.quantity
  }
  return total;
}

const Cart: React.FC<CartType> = ({ items, emptyCart }: { items: ItemType[], emptyCart: () => void }) => {
  return (
    <motion.div className=" text-center" variants={variants}>
      <h2 className="border-b-2  p-3 pb-4 ">Panier</h2>
      {items.length == 0 && (
        <div className="py-6">Your cart is empty</div>
      )}
      {items.length > 0 && (
        <>        <ul className=" p-3">
          {items.map(item => (
            <li key={item.id} className="flex flex-row justify-between">
              <div>
                <img className="h-14 w-auto" src={item.src} alt="" />
              </div>
              <div className="flex flex-col w-[80%]">
                <p className="text-left">{item.name}</p>

                <div className="flex flex-row justify-between">
                  <p className="text-left text-sm text-primary">quantité: {item.quantity}</p>
                  <div>{item.quantity * item.price}</div>

                </div>
              </div>

            </li>

          ))}
        </ul>

          <div className="border-t-2 flex p-[25px] flex-col">
            <div className="flex justify-between">
              <div className="text-xl ml-5">Total:</div><div>{TotalCount(items)}</div>
            </div>
            <div className="flex flex-row items-center mt-6 flex-wrap justify-center gap-4">
              <PrimaryButton className="w-full">Validate the cart</PrimaryButton>
              <motion.div whileHover={{ scale: 1.2 }}>
                <SecondaryButton className="flex flex-row" onClick={emptyCart}><TrashIcon />Empty the cart</SecondaryButton>
              </motion.div>
            </div>
          </div>
        </>

      )}



    </motion.div>
  )
};

export default Cart;

