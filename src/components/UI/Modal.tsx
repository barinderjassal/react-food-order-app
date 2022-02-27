import { FC, createElement, Fragment } from 'react';
import * as ReactDOM from 'react-dom';

import './styles/modal.css';

const Backdrop: FC<{
  onClickOutside: () => void;
}> = ({ onClickOutside }) => {
  return (
    <div className="backdrop" onClick={onClickOutside}></div>
  )
}

const ModalOverlay: FC = ({ children }) => {
  return (
    <div className="modal">
      <div className="content">
        {children}
      </div>
    </div>
  )
}

const portalDomElement: any = document.getElementById('overlays');

export const Modal: FC<{
  onClickOutside: () => void;
}> = ({ children, onClickOutside }) => {
  return (
    <Fragment>
      {/* <Backdrop />

      <ModalOverlay>
        {children}
      </ModalOverlay> */}
      {ReactDOM.createPortal(<Backdrop onClickOutside={onClickOutside}/>, portalDomElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalDomElement)}
    </Fragment>
  );
}