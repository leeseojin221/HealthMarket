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

export const EditButton = ({ editHandler }) => {
  return <EditBtn onClick={editHandler}>수정</EditBtn>;
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

// 남색 #1a4475 , 아이보리 #e9e6d8

export const SignupButton = ({ children, onClick }) => {
  return <SignupBtn onClick={onClick}>{children}</SignupBtn>;
};
const SignupBtn = styled.button`
  width: 80%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  background-color: #e9e6d8;
  color: #1a4475;
  cursor: pointer;
  margin-top: 9px;
`;

export const SigninButton = ({ children, onClick }) => {
  return <SigninBtn onClick={onClick}>{children}</SigninBtn>;
};

const SigninBtn = styled.button`
  width: 80%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background-color: #1a4475;
  color: #e9e6d8;
  cursor: pointer;
  margin-top: 9px;
`;

export const SigninWithGoogleButton = ({ children, onClick }) => {
  return <SigninWithGoogleBtn onClick={onClick}>{children}</SigninWithGoogleBtn>;
};

const SigninWithGoogleBtn = styled.button`
  flex: 1;
  width: 80%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  border: none;
  color: #1a4475;
  cursor: pointer;
  margin-top: 9px;
  margin-right: 5px;
`;
