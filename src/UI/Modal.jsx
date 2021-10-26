import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import * as S from './styles';

const Backdrop = props => {
  return <S.Backdrop onClick={props.onClose} />;
};

const ModalOverlay = props => {
  return (
    <S.Modal>
      <div>{props.children}</div>
    </S.Modal>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
