import React, { useState } from 'react';
import { styled } from 'styled-components';
import SelectBox from '../form/selectBox';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getItems } from '../axios/api';
import health from '../assets/healthmarket_logo.png';

function MainPage() {
  const { data, isLoading } = useQuery('info', getItems);

  const options = [
    { value: '0', name: '모든 상품' },
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' }
  ];

  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(options[0].value); // 기본 카테고리

  const onChange = (e) => {
    setSearchItem(e.target.value);
  };

  const onSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Stcontainer1>
        <SelectBox
          options={options}
          defaultValue={options[0].value}
          value={selectedCategory}
          onChange={onSelectChange}
        />
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
          data
            .filter((item) => selectedCategory === '0' || item.category === selectedCategory || selectedCategory === '')
            .filter(
              (item) =>
                (selectedCategory === '0' || item.category === selectedCategory || selectedCategory === '') &&
                item.title.toLowerCase().includes(searchItem.toLowerCase())
            )
            .map((item) => {
              if (selectedCategory === '0' || item.category === selectedCategory || selectedCategory === '') {
                return (
                  <StCard
                    key={item.id}
                    onClick={() => {
                      navigate(`detailPage/${item.id}`);
                    }}
                  >
                    <StImg src={health} />
                    <Stp>{item.title}</Stp>
                    <Stp>{item.price}원</Stp>
                    <Stp>카테고리: {item.category}</Stp>
                  </StCard>
                );
              } else {
                return null;
              }
            })
        )}
      </StContainer>
    </>
  );
}

export default MainPage;

const Stcontainer1 = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
`;

const Stcontainer2 = styled.div`
  white-space: nowrap;
  position: relative;
`;

const StserchInput = styled.input`
  width: 90%;
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
  border: solid 1px black;
  border-radius: 10px;
  background-color: #068fff;
`;

const StImg = styled.img`
  width: 60%;
  height: 40%;
  margin: 10px 0px 0px 35px;
  padding: 5px 5px 5px 5px;
  border: solid 1px white;
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
