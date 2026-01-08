import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ImageViewer from 'react-simple-image-viewer';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery(props: ImageGalleryProps) {

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0.3 },
    show: { opacity: 1 },
    normal: {opacity: [.5, 1, .5], transition: { repeat: Infinity }}
  }

  const { images } = props;

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  
  return (
    <div className="z-51 section-bg overflow-hidden flex flex-col md:flex-row justify-start items-start w-full">
      <motion.div
        className="gallery grid gap-0 grid-cols-5 grid-rows-5 h-5/6 w-full md:w-3/4 md:h-full"
        variants={containerAnimation}
        initial="hidden"
        whileInView="show">
        {images.map((image, imageIdx) => {
          return(
            <motion.div
              className={`w-full cursor-pointer border-white border-0 g-img-${imageIdx}`}
              key={`gallery-img-${imageIdx}`}
              onClick={ () => openImageViewer(imageIdx) }
              // animate={isStartAniDone ? "normal" : "hidden"}
              variants={itemAnimation}
              whileHover={{ borderWidth: 2, transition: { duration: 0.13 }}}
              whileTap={{ borderWidth: 4, transition: { duration: 0.13 }}}
              onHoverStart={e => {}}
              onHoverEnd={e => {}}>

              <img
                src={image}
                alt="example rendered images"
                className="w-full h-full object-cover"/>

            </motion.div>
          )
        })}
      </motion.div>

      <div className="w-full h-1/6 p-3 ml-8 md:ml-0 md:w-1/4 md:h-full flex flex-row md:flex-col justify-start md:justify-center items-center align-middle text-left md:text-center">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.66 }}
            whileInView={{ opacity: 1, scale: 1 }}>
            <img src="./img/success.svg" alt="done" className="w-8 md:w-20"/>
          </motion.div>
        </div>
        <div className="mt-[-0.2rem] ml-2 md:mt-3 md:ml-0">
          <div className="text-lg">Done</div>
          <div className="text-xs md:text-sm opacity-50 mt-[-0.4rem] md:mt-0">render in seconds</div>
        </div>
      </div>

      <div className="absolute">
        {isViewerOpen && (
          <ImageViewer
            src={ images }
            currentIndex={ currentImage }
            disableScroll={ false }
            closeOnClickOutside={ true }
            onClose={ closeImageViewer }
          />
        )}
      </div>

    </div>

  )
}
