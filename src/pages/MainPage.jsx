import React, { useState } from 'react';
import { styled } from 'styled-components';
import SelectBox from '../form/selectBox';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getItems } from '../axios/api';

function MainPage() {
  const options = [
    { value: '초기값', name: '선택해주세요' },
    { value: '축구', name: '축구' },
    { value: '농구', name: '농구' },
    { value: '테니스', name: '테니스' },
    { value: '헬스', name: '헬스' }
  ];
  const { data, isLoading } = useQuery('info', getItems);
  console.log('data=>', data);

  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState('');

  const onChange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <>
      <Stcontainer1>
        <SelectBox options={options} defaultValue=""></SelectBox>
        <Stcontainer2>
          <StserchInput placeholder="검색해주세요" value={searchItem} onChange={onChange} />
          <StSearchButton>
            <BiSearch />
          </StSearchButton>
        </Stcontainer2>
      </Stcontainer1>
      <StContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data.map((item) => (
            <StCard
              key={item.id}
              onClick={() => {
                navigate(`detailPage/${item.id}`);
              }}
            >
              <StImg src="health" />
              <Stp>{item.title}</Stp>
              <Stp>{item.price}원</Stp>
              <Stp>{item.category}</Stp>
            </StCard>
          ))
        )}
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
  border-color: #63717f;
  float: left;
  color: #63717f;
  padding-right: 10px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
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

const StSearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
