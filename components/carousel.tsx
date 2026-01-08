import { AnimatePresence, motion } from "framer-motion";
import { Children, ReactNode, useEffect, useState } from "react";

// ref https://codesandbox.io/s/react-3d-carousel-wth-framer-motion-rtn6vx?file=/src/App.js:0-3104
export function InfiniteCarousel({
  children,
  currentIdx,
}: {
  children: ReactNode[];
  currentIdx: number;
}) {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);
  const items = Children.toArray(children).map((e, i) => ({ e, i }));

  const windowSize = useWindowSize();

  // we want the scope to be always to be in the scope of the array so that the carousel is endless
  const indexInArrayScope = ((activeIndex % items.length) + items.length) % items.length;

  // so that the carousel is endless, we need to repeat the items twice
  // then, we slice the the array so that we only have 3 items visible at the same time
  const visibleItems = [...items, ...items].slice(indexInArrayScope, indexInArrayScope + 3);

  useEffect(() => {
    setActiveIndex((prevIndex) => [currentIdx, currentIdx > prevIndex[0] ? 1 : -1]);
  }, [currentIdx]);

  // Animation variants
  const variants = {
    enter: ({ direction }: { direction: number }) => {
      return { scale: 0.2, x: direction < 1 ? 50 : -50, opacity: 0 };
    },
    center: ({ position, direction }: { position: () => string; direction: number }) => {
      return {
        scale: position() === "center" ? 1 : 0.7,
        opacity: position() === "center" ? 1 : 0.3,
        x: getX(position),
        zIndex: getZIndex({ position, direction }),
      };
    },
    exit: ({ direction }: { direction: number }) => {
      return { scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0 };
    },
  };
  
  // Get X value
  const getX = (position: () => string) => {
    let xVal = 500;

    if(windowSize.width < 500) {
      xVal = 360;
    }
  
    if(windowSize.width >= 500 && windowSize.width <= 1280) {
      xVal = 750;
    }

    if(windowSize.width >= 1280 && windowSize.width <= 1920) {
      xVal = 850;
    }
  
    if(windowSize.width > 2800) {
      xVal = 580;
    }
  
    const indexes = {
      left: xVal,
      center: 0,
      right: -xVal,
    };
    return (indexes as any)[position()];
  }
  
  // Get Z value
  const getZIndex = ({ position, direction }: { position: () => string; direction: number }) => {
    const indexes = {
      left: direction > 0 ? 2 : 1,
      center: 3,
      right: direction > 0 ? 1 : 2,
    };
    return (indexes as any)[position()];
  }

  return (
    <div className="flex items-center flex-col mt-10">
      <div className="flex">
        {/*AnimatePresence is necessary to show the items after they are deleted because only max. 3 are shown*/}
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item) => {
            // The layout prop makes the elements change its position as soon as a new one is added
            // The key tells framer-motion that the elements changed its position
            return (
              <motion.div
                className="card"
                key={item.i}
                layout
                custom={{
                  direction,
                  position: () => {
                    if (item.i === visibleItems[0].i) {
                      return "left";
                    } else if (item.i === visibleItems[1].i) {
                      return "center";
                    } else {
                      return "right";
                    }
                  },
                }}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, type: "tween", ease: 'easeInOut' }}
              >
                {item.e}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}


// Get window size and render by it with resize handler inplace
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 1920,
    height: 1080,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}