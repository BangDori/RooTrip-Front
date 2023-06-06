import ReactDOM from 'react-dom';

import '@styles/components/Modal.scss';

const Backdrop = ({ onClose }) => (
  <div className='backdrop' onClick={onClose} />
);

const ModalOverlay = ({ className, children }) => (
  <div className={`modal ${className}`}>{children}</div>
);

const portalElement = document.getElementById('overlays');

const Modal = ({ className, onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay className={className}>{children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
