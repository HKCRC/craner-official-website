import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const ANI_DELAY_SELECTION_BOX = 1.5; // 1.5
const ANI_DELAY_GREEN_TABLE = ANI_DELAY_SELECTION_BOX + 1.5; // 3
const ANI_DELAY_INPUT = ANI_DELAY_GREEN_TABLE + 1; // 4
const ANI_DELAY_GREEN_TABLE_WAIT_RESULT = ANI_DELAY_INPUT + 5; // 9
const ANI_DELAY_RESULT = ANI_DELAY_GREEN_TABLE_WAIT_RESULT + 1.8; // 11
const ANI_DELAY_NEXT_LOOP = ANI_DELAY_RESULT + 3; // 14

export function RenderEdit() {

  const [startTypeWriter, setStartTypeWriter] = useState(false);
  const [isAniPlaying, setIsAniPlaying] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const container = useRef(null);
  const isInView = useInView(container, { once: true });

  useEffect(() => {

    let showTWTimer: ReturnType<typeof setTimeout>;
    let endTWTimer: ReturnType<typeof setTimeout>;
    let endAllTimer: ReturnType<typeof setTimeout>;
    let endNextTimer: ReturnType<typeof setTimeout>;

    // if not the first time, animation will loop forever disregard in or not in view
    if ((isInView || !isFirstTime) && !isAniPlaying) {
      setIsAniPlaying(true);
      setStartTypeWriter(false);

      showTWTimer = setTimeout(() => {
        setStartTypeWriter(true);
      }, ANI_DELAY_INPUT * 1000);
  
      endTWTimer = setTimeout(() => {
        setStartTypeWriter(false);
      }, (ANI_DELAY_RESULT + .1) * 1000);

      endAllTimer = setTimeout(() => {
        clearTimeout(showTWTimer);
        clearTimeout(endTWTimer);
        clearTimeout(endAllTimer);

        // Reset to default state
        setIsAniPlaying(false);
        // if not the first time, animation will loop forever disregard in or not in view
        setIsFirstTime(false);

        // next tick, loop forever, do not need clear
        endNextTimer = setTimeout(() => {
          setIsAniPlaying(true);
        }, 1000);

      }, ANI_DELAY_NEXT_LOOP * 1000)
    }

    return () => {
      // Not work will in mobile safari
      // clearTimeout(endNextTimer);
    }
  }, [isInView, isAniPlaying]);

  
  return (
    <div className="section-bg overflow-hidden flex justify-start items-start w-full relative" ref={container}>
      <div className="w-full h-full">
        <img src="./img/render/ani_edit_before.webp" alt="edit before" className="w-full h-full object-cover"/>
      </div>

      { isAniPlaying ? 
        <div>
          <motion.div
            className="absolute left-[40px] top-[160px] md:left-[140px] md:top-[230px]"
            style={{transformOrigin: '1% 1%', width: 175}}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], scale: 1 }}
            transition={{delay: ANI_DELAY_SELECTION_BOX, duration: 1.8, ease: 'easeInOut'}}>
            <img src="./img/box_selection.svg" alt="edit before" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            style={{left: 0, top: 0}}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{delay: ANI_DELAY_GREEN_TABLE, duration: .2}}>
            <img src="./img/render/ani_edit_table.webp" alt="edit selected" className="w-full h-full object-cover"/>
          </motion.div>

          <motion.div
            className="absolute w-full h-full left-[20px] top-[130px] md:left-[120px] md:top-[200px]"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: ANI_DELAY_INPUT, duration: 0.22 }}
            exit={{ opacity: 0, x: 30 }}
          >
            <div className="absolute w-[15rem] md:w-[25rem] text-black rounded-lg flex justify-between text-xs md:text-sm py-2 px-3 left-0 top-[.1rem] md:top-0" style={{background: '#F1F1F1', border: '1px solid rgba(0, 0, 0, 0.23)', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)'}}>
            {
              startTypeWriter ? 
                <div className="h-full">
                  <Typewriter
                    words={['Change the table surface to dark polished teak wood']}
                    loop={1}
                    cursor
                    cursorStyle="|"
                    typeSpeed={50}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </div>
                : <span>Change the table surface to dark polished teak wood</span>
            }
            <div className="h-full">
              <img src="./img/send_black.webp" alt="" className="w-5" />
            </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            style={{left: 0, top: 0}}
            initial={{ opacity: 0}}
            animate={{ opacity: [0,1,0,1,0,1,0,1]}}
            transition={{delay: ANI_DELAY_GREEN_TABLE_WAIT_RESULT, duration: 2, ease: 'linear'}}>
            <img src="./img/render/ani_edit_table_editing.webp" alt="edit selected" className="w-full h-full object-cover"/>
          </motion.div>

          <motion.div
            className="absolute w-full h-full"
            style={{left: 0, top: 0}}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{delay: ANI_DELAY_RESULT, duration: .45}}>
            <img src="./img/render/camera_overview.webp" alt="edit selected" className="w-full h-full object-cover rounded"/>
          </motion.div>
        </div> : null
      }
      
    </div>

  )
}
