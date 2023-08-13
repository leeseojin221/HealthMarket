import React from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Buttons({ children, ...props }) {
  return <></>;
}

export default Buttons;

export const DeleteButton = ({ handleDelete }) => {
  // const deleteMutation = useMutation(deleteHealth, {
  //   onSuccess: () => {
  //     console.log('invalidateQueries');
  //     queryClient.invalidateQueries('info');
  //   }
  // });

  // if (isLoading) {
  //   return <div>로딩중 ...</div>;
  // }
  // const handleDelete = async () => {
  //   const isDeletable = window.confirm('정말 삭제하시겠습니까?');
  //   if (isDeletable) {
  //     try {
  //       await deleteMutation.mutate(id);
  //       console.log('await 끝');
  //       navigate('/myPage');
  //     } catch (error) {
  //       console.log('오류가 발생했습니다', error);
  //     }
  //   }
  // };
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
