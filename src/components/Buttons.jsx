import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Buttons({ children, ...props }) {
  return <></>;
}

export default Buttons;

export const DeleteButton = ({ handleDelete }) => {
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
  return <EditBtn onClick={editHandler}>저장</EditBtn>;
};

export const CreateButton = ({ handleWriteButtonClick }) => {
  return <CreateBtn onClick={handleWriteButtonClick}>글쓰기</CreateBtn>;
};

export const ClossButton = ({ ClossModal }) => {
  return <ClossBtn onClick={ClossModal}>닫기</ClossBtn>;
};

export const WriteButton = ({ handleWrite }) => {
  return <WriteBtn onClick={handleWrite}>작성하기</WriteBtn>;
};

const CreateBtn = styled.button`
  /* background-color: white;
cursor: pointer; */
  align-items: center;
  /* margin: 5px; */
  margin-right: 10px;
  width: 100px;
  height: 30px;
  border-radius: 7px;
  /* padding: 10px 15px; */
  background-color: #dddff0;
  color: #1a4475;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #1a4475;
    color: #dddff0;
    transition: all 0.3s;
  }
`;

const ClossBtn = styled.button`
  /* background-color: white;
cursor: pointer; */
  align-items: center;
  /* margin: 5px; */
  margin-right: 10px;
  width: 50px;
  height: 30px;
  border-radius: 7px;
  /* padding: 10px 15px; */
  background-color: #dddff0;
  color: #1a4475;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #1a4475;
    color: #dddff0;
    transition: all 0.3s;
  }
`;

const WriteBtn = styled.button`
  justify-content: center;
  align-items: center;
  /* margin: 5px; */
  margin-right: 10px;
  width: 250px;
  height: 30px;
  border-radius: 7px;
  /* padding: 10px 15px; */
  background-color: #dddff0;
  color: #1a4475;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #1a4475;
    color: #dddff0;
    transition: all 0.3s;
  }
`;

const DeleteBtn = styled.button`
  /* background-color: white;
  cursor: pointer; */
  align-items: center;
  /* margin: 5px; */
  margin-right: 10px;
  width: 100px;
  height: 30px;
  border-radius: 7px;
  /* padding: 10px 15px; */
  background-color: #dddff0;
  color: #1a4475;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #1a4475;
    color: #dddff0;
    transition: all 0.3s;
  }
`;

const EditBtn = styled.button`
  /* background-color: white;
  margin-right: 10px;
  cursor: pointer; */
  align-items: center;
  /* margin: 5px; */
  // margin-left: 100px;
  margin-right: 10px;
  width: 100px;
  height: 30px;
  border-radius: 7px;
  /* padding: 10px 15px; */
  background-color: #dddff0;
  color: #1a4475;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  align-items: center;
  /* margin: 5px; */
  margin-right: 10px;
  width: 100px;
  height: 30px;
  border-radius: 7px;
  /* padding: 10px 15px; */
  background-color: #dddff0;
  color: #1a4475;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #1a4475;
    color: #dddff0;
    transition: all 0.3s;
  }
`;

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
