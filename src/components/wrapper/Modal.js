import ReactDOM from 'react-dom';

import '@styles/components/Modal.scss';

const Backdrop = ({ onClose }) => (
  <div className='backdrop' onClick={onClose} />
);

const ModalOverlay = ({ children }) => <div className='modal'>{children}</div>;

const portalElement = document.getElementById('overlays');

const Modal = ({ onClose, children }) => {
  return (
    <>
      {/* {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)} */}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement,
      )}
    </>
  );
};

export default Modal;
