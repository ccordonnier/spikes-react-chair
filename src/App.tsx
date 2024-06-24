import { useEffect, useRef, useState } from 'react'
import './App.css'
import PrimaryButton from './components/buttons/PrimaryButton'
import SecondaryButton from './components/buttons/SecondaryButton'
import ArrowLeftIcon from './components/icons/ArrowLeftIcon'
import CartIcon from './components/icons/CartIcon'
import FacebookIcon from './components/icons/FacebookIcon'
import HeartIcon from './components/icons/HeartIcon'
import InstagramIcon from './components/icons/InstagramIcon'
import MenuIcon from './components/icons/MenuIcon'
import PinterestIcon from './components/icons/PinterestIcon'
import SearchIcon from './components/icons/SearchIcon'
import TwitterIcon from './components/icons/TwitterIcon'
import Carousel from './components/Carousel'
import { motion, useCycle } from 'framer-motion'
import FullStarIcon from './components/icons/FullStarIcon'
import HalfStarIcon from './components/icons/HalfStarIcon'
import { useDimensions } from "./use-dimensions";
import Cart from './components/Cart';
import toast, { Toaster } from 'react-hot-toast';


type ItemType = {
  id: number,
  src: string,
  name: string,
  quantity: number,
  price: number,
}

type CartType = ItemType[] | [];

function App() {
  const primaryColor = "#3aa39f";
  const secondaryColor = "#a2a3b1";
  const [heartStroke, setHeartStroke] = useState(primaryColor);
  const [heartFill, setHeartFill] = useState("none");
  const [count, setCount] = useState<number>(1);
  const [colorIndex, setColorIndex] = useState<number>(1);
  const notify = (message: string) => toast.success(message);
  const [WishlistButtonState, setWishListButtonState] = useState("");
  const [wishList, setWishList] = useState(new Set<number>());

  //cart
  const [cart, setCart] = useState<CartType>([]);
  const [cartIsOpen, setCartIsOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const sidebar = {
    open: () => ({
      clipPath: "rect(1px 400px 600px -50px)",

      transition: {
        delai: 0.5,
        type: "spring",
        stiffness: 400,
        restDelta: 2,
        damping: 40

      }
    }),
    closed: {
      //rect(top right bottom left)
      clipPath: "rect(0px 400px 0px 230px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        restDelta: 2,
        damping: 40
      }
    }
  };

  const updateCart = (id) => {
    if (!cart.length) {
      let newCart: CartType = [{ id: 1, name: "Meryl Lounge Chair", src: '../src/assets/01.jpg', quantity: count, price: 149.99 }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      setCart((prevcart) => {
        let newCart = prevcart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + count } : item
        )
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart

      });

    }
    notify("Product add to cart");
  }

  const emptyCart = () => {
    setCart([]);
    notify("Cart is empty");
    localStorage.removeItem("cart");
  }

  const colors = [
    "bg-slate-300", "bg-slate-400", "bg-slate-500", "bg-slate-600"
  ]

  const downCount = () => {
    if (count > 1) {
      let newCount = count - 1;
      setCount(newCount)
    }
  }

  const upCount = () => {
    let newCount = count + 1;
    setCount(newCount);
  }

  const AddToWishList = (id: number) => {
    let tmpWishList = new Set(wishList);
    tmpWishList.add(id);
    setWishList(tmpWishList);
    localStorage.setItem("wishList", JSON.stringify([...tmpWishList]));
    notify("Product added to wishlist !");
  }

  const RemoveToWishList = (id: number) => {
    let tmpWishList = new Set(wishList);
    tmpWishList.delete(id);
    setWishList(tmpWishList);
    localStorage.setItem("wishList", JSON.stringify([...tmpWishList]));
    notify("Product removed to wishlist !");

  }

  const handleWishListButtonClick = (id: number) => {
    if(wishList.has(id)){
      RemoveToWishList(id)
    }else{
      AddToWishList(id);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      let tmpCart = JSON.parse(localStorage.getItem("cart"))
      setCart(tmpCart);
    }

    if(localStorage.getItem("wishList")){
      let tmpWishList = JSON.parse(localStorage.getItem("wishList"));
      setWishList(new Set(tmpWishList));
      setWishListButtonState("active");
    }
  }, [])

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className='flex flex-col'>
        <motion.nav className='relative flex flex-row justify-between items-center border-b-2'
          initial={{ top: -100, opacity: 0 }}
          animate={{ top: 0, opacity: 1 }}
          transition={{ duration: 1 }}>
          <div className='text-lg' id='logo'><img src="../src/assets/logo.svg" alt="" /></div>
          <div>
            <a href="#">Shop</a>
            <a href="#">Exclusive</a>
            <a href="#">Designers</a>
            <a href="#">About us</a>
            <a href="#">Contact</a>
          </div>
          <div className='flex flex-row cursor-pointer'>
            <div className='p-6'><MenuIcon /></div>
            <div className='p-6'><SearchIcon /></div>
            <div className='p-6 border-l-2 hover:bg-slate-100 cursor-pointer' onClick={() => setCartIsOpen()}>
              <CartIcon />
              {cart.length > 0 && (
                <span className='absolute top-0 right-0 bg-primary text-white rounded-full p-1 w-6 h-6 text-sm mt-3 text-center'>{cart.length}</span>
              )}
            </div>
            <motion.div initial={false} animate={cartIsOpen ? "open" : "closed"} custom={height} ref={containerRef}>
              <motion.div className='background border-l-2 border-b-2 bg-white z-10' variants={sidebar}>
                <Cart items={cart} emptyCart={emptyCart}></Cart>
              </motion.div>
            </motion.div>
          </div>
        </motion.nav>
        <main className='flex flex-row mt-10 self-center mx-[]'>
          <motion.div className='relative flex flex-col w-1/2 mr-40 justify-between'
            initial={{ left: -100, opacity: 0 }}
            animate={{ left: 0, opacity: 1 }}
            transition={{ duration: 1 }}>
            <div className='rounded-full hover:bg-slate-100 w-10 h-10 cursor-pointer -ml-2 flex items-center justify-center'><ArrowLeftIcon /></div>
            <div className='thumbnail mt-4 '><a className='text-slate-400' href="#">Chair</a> / <a href="#">Meryl Lounge Chair</a></div>
            <div className=''>
              <h1 className='relative mt-10'>Meryl Lounge Chair</h1>
              <div className='flex w-full mt-8'>
                <h2>$149.99</h2>
                <div className='flex ml-32'>
                  <div className='flex mr-4'>
                    <FullStarIcon />
                    <FullStarIcon />
                    <FullStarIcon />
                    <FullStarIcon />
                    <HalfStarIcon />
                  </div>
                  <div>4.6/5.0 <span className='text-primary'>(556)</span></div>
                </div>
              </div>
            </div>
            <div className='mt-8'>
              <p className=''
              >
                The gently curved lines accentuated by sewn details are kind to your body and pleasant to look at.
                Also, there's a tilt and height-adjusting mechanism that's built to outlast years of ups and downs.
              </p>
              <div className='flex mt-8 items-center'>
                {colors.map((color, index) => {
                  return (
                    <div className={(index == colorIndex ? 'p-[2px] border-4 border-primary rounded-full mx-2' : 'mx-2 p-[3px]')}>
                      <span className={`block ${color} rounded-full w-[20px] h-[20px] cursor-pointer`} onClick={() => setColorIndex(index)}></span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='mt-8 flex flex-row'>
              <div className='border-2 rounded max-w-36 mr-2'>
                <button className='h-full w-1/4 hover:bg-slate-100 active:bg-slate-200' onClick={() => downCount()}>-</button><input type="text" value={count} className='h-full w-2/4 outline-0 text-center' onChange={(e) => setCount(parseInt(e.target.value))} /><button className='h-full w-1/4 hover:bg-slate-100 active:bg-slate-200' onClick={() => upCount()}>+</button>
              </div>
              <div>
                <PrimaryButton onClick={() => updateCart(1)}>Add to Cart</PrimaryButton>
              </div>
            </div>
            <div className='mt-8'>
              <p>Free 3-5 day shipping  •  Tool-free assembly  •  30-day trial</p>
            </div>
            <div className='mt-12 flex flex-row justify-between'>

              <SecondaryButton className="label medium" onClick={()=>handleWishListButtonClick(1)}><motion.div className='flex flex-row items-center' whileHover={{ scale: 1.2 }}><HeartIcon stroke={heartStroke} fill={wishList.has(1)?primaryColor:"none"} /><span className='ml-2'>Add to Wishlist</span></motion.div></SecondaryButton>

              <ul className='flex flex-row'>
                <li className='p-2'><motion.a style={{ display: "block" }} href='#' whileHover={{ scale: 1.3 }}><FacebookIcon /></motion.a></li>
                <li className='p-2'><motion.a style={{ display: "block" }} href='#' whileHover={{ scale: 1.3 }}><TwitterIcon /></motion.a></li>
                <li className='p-2'><motion.a style={{ display: "block" }} href='#' whileHover={{ scale: 1.3 }}><PinterestIcon /></motion.a></li>
                <li className='p-2'><motion.a style={{ display: "block" }} href='#' whileHover={{ scale: 1.3 }}><InstagramIcon /></motion.a></li>
              </ul>
            </div>
          </motion.div>
          <div className='flex flex-col w-1/2'>

            <Carousel />
            {/* <div className='flex justify-center h-[50vh] items-center'>
              <img className='h-full w-auto' src="./src/assets/chair1.png" alt="inclined view of chair meryl lounge chair" />
              <div className='back-gradient bg-primary-gradient opacity-10 absolute right-0 w-1/4 h-1/4'></div>
            </div>
            <div className="grid grid-cols-5">
              <img src="./src/assets/chair1.png" alt="inclined view of chair meryl lounge chair" />
              <img src="./src/assets/chair2.png" alt="left vue of chair meryl lounge chair" />
              <img src="./src/assets/chair3.png" alt="front vue of chair meryl lounge chair" />
              <img src="./src/assets/chair4.png" alt="zoomed vue of chair meryl lounge chair" />
              <img src="./src/assets/chair5.png" alt="detailed vue of chair meryl lounge chair with mesures" />
            </div> */}
          </div>
        </main >
      </div >
    </>
  )
}

export default App
