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
      alert('수정 페이지로 이동합니다.');
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

export const EditButton = ({ editHandler }) => {
  return <EditBtn onClick={editHandler}>저장</EditBtn>;
};

const DeleteBtn = styled.button`
  background-color: #e9e6d8;
  color: #ffa596;
  border: none;
  width: 80px;
  height: 30px;
  cursor: pointer;
`;

const EditBtn = styled.button`
  background-color: #9ab6ff;
  color: #e9e6d8;
  border: none;
  margin-right: 10px;
  width: 80px;
  height: 30px;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  background-color: #e9e6d8;
  color: #ffa596;
  border: none;
  width: 80px;
  height: 30px;
  cursor: pointer;
`;
