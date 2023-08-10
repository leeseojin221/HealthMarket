import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Buttons({ children, ...props }) {
  return <></>;
}

export default Buttons;

export const DeleteButton = ({ handleDelete }) => {
  // const navigate = useNavigate();
  // const deleteButton = () => {};
  return <DeleteBtn onClick={handleDelete}>삭제</DeleteBtn>;
};

export const EditLinkButton = ({ id }) => {
  // console.log('id=>', id);
  const navigate = useNavigate();
  const editLinkButton = () => {
    if (editLinkButton) {
      alert('수정페이지로 이동합니다.');
      navigate(`/editPage/${id}`);
    }
  };
  return <EditBtn onClick={editLinkButton}>수정</EditBtn>;
};

export const CancelButton = ({ id }) => {
  const navigate = useNavigate();
  const cancelLinkButton = () => {
    if (cancelLinkButton) {
      navigate(`/detailPage/${id}`);
    }
  };
  return <CancelBtn onClick={cancelLinkButton}>취소</CancelBtn>;
};

export const EditButton = () => {
  const editButton = () => {};
  return <EditBtn onClick={editButton}>수정</EditBtn>;
};

const DeleteBtn = styled.button`
  background-color: white;
  cursor: pointer;
`;

const EditBtn = styled.button`
  background-color: white;
  margin-right: 10px;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  background-color: white;
  cursor: pointer;
`;
