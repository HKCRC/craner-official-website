import { AnimatePresence, motion } from "framer-motion";
import WaitingListForm from "./form";
import { useWindowSize } from "react-use";

export const ModalWrapper = (props: {
  onClickMask: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-screen h-screen bg-black z-50"
        onClick={props.onClickMask}
      ></motion.div>

      {props.children}
    </div>
  );
};

export const WaitingListModal = (props: { onClose: () => void }) => {
  const isMobile = useWindowSize().width < 768;

  const variants = isMobile
    ? {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 200 },
      }
    : {
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.8 },
      };

  const transition = isMobile
    ? { duration: 0.3, ease: "easeOut" }
    : { type: "spring", stiffness: 500, damping: 32, duration: 0.54 };

  return (
    <ModalWrapper onClickMask={props.onClose}>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center md:items-center justify-center z-50">
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={transition}
          className="flex relative h-2/3 rounded-3xl flex-col w-[90%] min-h-fit  text-white md:h-auto md:max-h-[90vh] rounded-t-xl md:rounded-xl bg-white/30 backdrop-blur-xl border-2 border-white/5 md:max-w-lg p-3 z-50 nobar overflow-visible"
        >
          <div
            className="absolute top-5 right-10 text-4xl opacity-30 cursor-pointer hover:opacity-20"
            onClick={props.onClose}
          >
            ×
          </div>
          <WaitingListForm onClose={props.onClose} />
        </motion.div>
      </div>
    </ModalWrapper>
  );
};
