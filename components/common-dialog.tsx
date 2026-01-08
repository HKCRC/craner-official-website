import React, { forwardRef, useState, useImperativeHandle, useCallback } from "react";
import styles from "@/styles/dialog.module.css";

export const CommonDialogManager: React.RefObject<{
    show: (el: JSX.Element) => void;
}> = React.createRef();

// eslint-disable-next-line react/display-name
const ShowToast = forwardRef((_: any, ref: any) => {
    const [open, setOpen] = useState(false);
    const [element, setElement] = useState<JSX.Element>();

    const hidden = useCallback(() => {
        setOpen(false);
      }, []);

    const show = useCallback((el: JSX.Element) => {
        setElement(el);
        setOpen(true);
    }, []);

    const clickMask = useCallback(() => {
        hidden();
      }, [hidden]);
    

    useImperativeHandle(
        ref,
        () => ({
          show,
          hidden,
        }),
        [hidden, show],
      );
    
    return open ? (
        <React.Fragment>
            <div className={styles.ShowDialogWrapper}>
                <div className="fixed left-0 top-0 w-full h-full backdrop-blur-md" style={{zIndex: 100}} onClick={clickMask}></div>
                <div className="fixed right-3 top-3 w-10 h-10 cursor-pointer px-2 py-2 bg-black/80 hover:bg-white backdrop-blur shadow-sm border border-slate-200 rounded-full" style={{zIndex: 101}} onClick={clickMask}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>
                <div className={styles.dialogMainWrapper} onClick={e => e.stopPropagation()}>
                    <div className={styles.dialogMainContent}>
                        {element}
                    </div>
                </div>
            </div>
        </React.Fragment>
  ) : null;
});


const ToastComponent = () => <ShowToast ref={CommonDialogManager} />;

export default ToastComponent;
