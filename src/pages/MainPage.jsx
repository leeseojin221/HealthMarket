import React, { useState } from 'react';
import { styled } from 'styled-components';
import SelectBox from '../form/selectBox';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getItems, addHealth } from '../axios/api';
import health from '../assets/healthmarket_logo.png';
import WriteModal from '../form/WriteModal';
import { auth } from '../axios/firebase';

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
  // 추가부분
  // const [isModalOpen, setIsModalOpen] = useState(fasle);
  const [searchItem, setSearchItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(options[0].value); // 기본 카테고리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onChange = (e) => {
    setSearchItem(e.target.value);
  };

  const onSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleWriteButtonClick = () => {
    const user = auth.currentUser;

    if (user) {
      setIsModalOpen(true);
      console.log('글쓰기!');
    } else {
      alert('로그인이 필요합니다.');
    }
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
          <StserchInput>
            <InputField type="text" placeholder="검색해주세요" value={searchItem} onChange={onChange} />
            <SearchIcon />
          </StserchInput>
          <button onClick={handleWriteButtonClick}>글쓰기</button>
        </Stcontainer2>
      </Stcontainer1>
      {isModalOpen && <WriteModal closeModal={openModal} />}
      <StContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data
            .filter((item) => selectedCategory === '0' || item.category === selectedCategory || selectedCategory === '')
            .filter((item) => {
              if (item.category) {
                // category 속성이 있는지 확인
                return (
                  (selectedCategory === '0' || item.category === selectedCategory || selectedCategory === '') &&
                  item.title.toLowerCase().includes(searchItem.toLowerCase())
                );
              }
              return false; // category 속성이 없으면 필터링에서 제외
            })
            .map((item) => {
              if (selectedCategory === '0' || item.category === selectedCategory || selectedCategory === '') {
                return (
                  <StCard
                    key={item.id}
                    onClick={() => {
                      navigate(`detailPage/${item.id}`);
                    }}
                  >
                    <StImg src={item.img} />
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
  gap: 12px;
  margin-bottom: 20px;
`;

const Stcontainer2 = styled.div`
  white-space: nowrap;
  position: relative;
`;

const StserchInput = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 20px;
  margin-right: 10px;
  border: solid 1px #63717f;
  float: left;
  color: #63717f;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
`;

const StContainer = styled.div`
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
`;

const StCard = styled.div`
  width: calc(22% - 24px);
  height: 240px;
  border: solid 1px black;
  border-radius: 10px;
  background-color: #068fff;
  margin-bottom: 24px;
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

const SearchIcon = styled(BiSearch)`
  color: #63717f;
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: #63717f;
  padding-right: 10px;
`;
