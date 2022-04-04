import { FC, TransitionEvent, useEffect, useRef, useState } from 'react';

import './Modal.css';

const Modal: FC = ({children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const backdropRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   setIsOpen(true)
  // }, [])

  const handleClose = (): void => setIsOpen(false);

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    console.log(e)
    console.log(isOpen)

    if(!isOpen && backdropRef.current) {
      backdropRef.current.style.visibility = 'hidden'
    }
  }

  return (
    <div className={`backdrop ${isOpen ? 'show' : ''}`} ref={backdropRef} onTransitionEnd={handleTransitionEnd}>
      <div className='modal'>
        <button onClick={handleClose} className='close-btn'>x</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
