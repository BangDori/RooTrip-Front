import ReactDOM from 'react-dom';

import '@styles/modal/Modal.scss';

const Backdrop = ({ onClose }) => (
  <div className='backdrop-container' onClick={onClose} />
);

const ModalOverlay = ({ className, children }) => (
  <div className={`modal-container ${className}`}>{children}</div>
);

const portalElement = document.getElementById('overlays');

const Modal = ({ isChatbot, onClose, children }) => (
  <>
    {!isChatbot &&
      ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
    {ReactDOM.createPortal(
      <ModalOverlay>{children}</ModalOverlay>,
      portalElement,
    )}
  </>
);

export default Modal;
