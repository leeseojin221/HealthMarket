import React from 'react';
import error from '../assets/error.png';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function NotFound() {
  const navigate = useNavigate();
  return (
    <StTextDiv>
      <img src={error} />
      <div></div>
      <h1>404 ERROR!</h1>
      <div>찾을 수 없는 페이지 입니다.</div>
      <StErrordiv
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로 돌아가기
      </StErrordiv>
    </StTextDiv>
  );
}

export default NotFound;

export const StTextDiv = styled.div`
  text-align: center;
`;

export const StErrordiv = styled.div`
  margin-top: 15px;
`;
