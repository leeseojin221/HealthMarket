import React from 'react';
import { styled } from 'styled-components';
import SelectBox from '../form/selectBox';
import health from '../assets/healthmarket_logo.png';

function MainPage() {
  const options = [
    { value: '초기값', name: '선택해주세요' },
    { value: '축구', name: '축구' },
    { value: '농구', name: '농구' },
    { value: '테니스', name: '테니스' },
    { value: '헬스', name: '헬스' }
  ];

  const items = [
    {
      title: 'item 1',
      price: 20000,
      category: '축구'
    },
    {
      title: 'item 2',
      price: 20000,
      category: '농구'
    },
    {
      title: 'item 3',
      price: 20000,
      category: '테니스'
    },
    {
      title: 'item 4',
      price: 20000,
      category: '헬스'
    }
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

      <StContainer>
        {items.map((item, index) => (
          <StCard key={index}>
            <StImg src="health" />
            <Stp>{item.title}</Stp>
            <Stp>{item.price}원</Stp>
            <Stp>{item.category}</Stp>
          </StCard>
        ))}
      </StContainer>
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

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const StCard = styled.div`
  width: 200px;
  height: 240px;
  background-color: #068fff;
`;

const StImg = styled.img`
  display: flex;
  justify-content: center;
`;

const Stp = styled.p`
  display: flex;
  justify-content: center;
  font-size: 13px;
`;
