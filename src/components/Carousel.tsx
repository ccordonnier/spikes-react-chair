import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon'
import ChevronRightIcon from '../components/icons/ChevronRightIcon'

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { src: '../src/assets/01.jpg', alt: 'Inclined view of chair meryl lounge chair' },
    { src: '../src/assets/02.jpg', alt: 'Left vue of chair meryl lounge chair' },
    { src: '../src/assets/03.jpg', alt: 'Front vue of chair meryl lounge chair' },
    { src: '../src/assets/042.jpg', alt: 'Zoomed vue of chair meryl lounge chair' },
    { src: '../src/assets/05.jpg', alt: 'Detailed vue of chair meryl lounge chair with mesures' },
    // Ajouter d'autres slides si nécessaire
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const variants = {
    hidden: (direction: string) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const direction = 1;

  return (
    <div className="gallery-container">
      <motion.div className='relative'
        initial={{ right: -100, opacity: 0 }}
        animate={{ right: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className='flex justify-end '>
          <span className='text-black text-4xl font-bold'>0{activeIndex + 1}</span><span className='text-slate-400 text-4xl ml-2'> /0{slides.length}</span>
        </div>
        <div className='flex justify-end gap-8'>
          <ChevronLeftIcon width={40} height={40} onClick={() => handlePrev()} />
          <ChevronRightIcon width={40} height={40} onClick={() => handleNext()} />
        </div>
      </motion.div>
      <motion.div
        initial={{ marginRight: -100, opacity: 0 }} animate={{ marginRight: 0, opacity: 1 }} transition={{ duration: 1 }}
        className='flex justify-end h-[60vh] items-center pr-20'>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            className='absolute max-w-none h-[60vh] w-auto'
            key={activeIndex}
            src={slides[activeIndex].src}
            alt={slides[activeIndex].alt}
            custom={direction}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ delay: 0.5 }}
          className='absolute back-gradient bg-primary-gradient opacity-10 right-0 w-1/4 h-1/4'></motion.div>
      </motion.div>
      <motion.div className="relative grid grid-cols-5 gap-4"
        initial={{ bottom: -100, opacity: 0 }}
        animate={{ bottom: 0, opacity: 1 }}
        transition={{ duration: 1 }}>
        {slides.map((slide, index) => {
          return <img className={`${index == activeIndex ? 'border-primary' : 'border-secondary'} hover:border-hover border-[3px] rounded p-4 cursor-pointer`} src={slide.src} alt={slide.alt} onClick={() => setActiveIndex(index)}></img>
        })}
      </motion.div>
    </div>
  );
};

export default Carousel;