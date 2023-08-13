import React, { useState } from 'react';
import { styled } from 'styled-components';
import SelectBox from '../form/selectBox';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getItems } from '../axios/api';
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

  const [searchItem, setSearchItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(options[0].value);

  const onChange = (e) => {
    setSearchItem(e.target.value);
  };

  const onSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWriteButtonClick = () => {
    const user = auth.currentUser;

    if (user) {
      setIsModalOpen(true);
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
      {isModalOpen && <WriteModal setIsModalOpen={setIsModalOpen} />}
      <StContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data
            .filter((item) => selectedCategory === '0' || item.category === selectedCategory || selectedCategory === '')
            .filter((item) => {
              if (item.category) {
                return (
                  (selectedCategory === '0' || item.category === selectedCategory || selectedCategory === '') &&
                  item.title.toLowerCase().includes(searchItem.toLowerCase())
                );
              }
              return false;
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
  height: 30px;
  margin-right: 10px;
  border: solid 1px #63717f;
  float: left;
  color: #63717f;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
`;

const StContainer = styled.div`
  max-height: 80vh;
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const StCard = styled.div`
  flex: column;
  width: calc(22% - 10px);
  height: 240px;
  background-color: white;
  margin-bottom: 0px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const StImg = styled.img`
  width: 90%;
  height: 65%;
  margin: 5px 0px 0px 5px;
  padding: 5px 5px 5px 5px;
  border: solid 1px white;
`;

const StTitlediv = styled.div`
  margin-left: 5px;
`;
const Stp = styled.p`
  justify-content: flex-start;
  margin: 0px;
  font-size: 14px;
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
