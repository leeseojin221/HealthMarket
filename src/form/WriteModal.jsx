import React from 'react';
import { styled } from 'styled-components';

function WriteModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <StContainer>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </StContainer>
  );
}

export default WriteModal;

const StContainer = styled.div`
  width: 500px;
  height: 500px;
  border: solid 1px black;
  display: flex;
  flex: row;
`;
