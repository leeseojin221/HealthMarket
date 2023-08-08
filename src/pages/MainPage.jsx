import React from 'react';
import { styled } from 'styled-components';
import SelectBox from '../form/selectBox';

function MainPage() {
  const options = [
    { value: '초기값', name: '선택해주세요' },
    { value: '축구', name: '축구' },
    { value: '농구', name: '농구' },
    { value: '테니스', name: '테니스' },
    { value: '헬스', name: '헬스' }
  ];

  return (
    <>
      <Stcontainer1>
        <SelectBox options={options} defaultValue=""></SelectBox>
        <Stcontainer2>
          <StserchInput placeholder="검색해주세요" />
          <span>
            <i></i>
          </span>
        </Stcontainer2>
      </Stcontainer1>
    </>
  );
}

export default MainPage;

const Stcontainer1 = styled.div`
  display: flex;
`;

const Stcontainer2 = styled.div`
  white-space: nowrap;
  position: relative;
`;

const StserchInput = styled.input`
  width: 100px;
  height: 20px;
  border: none;
`;
