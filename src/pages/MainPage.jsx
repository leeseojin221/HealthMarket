import React from 'react';
import { styled } from 'styled-components';
import health from '../assets/healthmarket_logo.png';

function MainPage() {
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
