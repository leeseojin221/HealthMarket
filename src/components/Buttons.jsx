import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Buttons({ children, ...props }) {
  return <></>;
}

export default Buttons;

export const DeleteButton = () => {
  const navigate = useNavigate();
  const deleteButton = () => {
    const isDeletable = window.confirm('정말 삭제하시겠습니까?');
    if (isDeletable) {
      // deleteItem(id);
      alert('삭제되었습니다.');
      navigate('/myPage');
    }
  };
  return <DeleteBtn onClick={deleteButton}>삭제</DeleteBtn>;
};

export const EditLinkButton = () => {
  const navigate = useNavigate();
  const editLinkButton = () => {
    if (editLinkButton) {
      alert('수정페이지로 이동합니다.');
      navigate('/editPage');
    }
  };
  return <button onClick={editLinkButton}>수정</button>;
};

export const CancelButton = () => {
  const navigate = useNavigate();
  const cancelLinkButton = () => {
    if (cancelLinkButton) {
      navigate('/detailPage');
    }
  };
  return <button onClick={cancelLinkButton}>취소</button>;
};

const DeleteBtn = styled.button`
  background-color: red;
`;
