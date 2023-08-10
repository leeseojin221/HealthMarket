import React, { useState } from 'react';
import { styled } from 'styled-components';
import SelectBox from '../form/selectBox';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getItems, addHealth } from '../axios/api';
import health from '../assets/healthmarket_logo.png';
import { Location } from 'react-router-dom';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [priec, setPriec] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriec(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      await addHealth(title, priec, content, selectedCategory);
      closeModal();
    } catch (error) {
      console.error('Error adding health: ', error);
    }
    window.location.reload('/');
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
      <button onClick={openModal}>글쓰기</button>
      {isModalOpen && (
        <StModal>
          <h2>글 작성</h2>
          <StModalTitleInput type="text" placeholder="제목" value={title} onChange={handleTitleChange} />
          <StModalPriceInput type="text" placeholder="가격" value={priec} onChange={handlePriceChange} />
          <StModalTextarea placeholder="내용" value={content} onChange={handleContentChange} />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload}>작성</button>
          <button onClick={closeModal}>닫기</button>
        </StModal>
      )}
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
  margin: 0 auto;
  width: 100%;
  height: 60%;
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

const StModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-style: solid;
  padding: 50px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const StModalTitleInput = styled.input`
  border-style: solid;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 15px;
`;

const StModalPriceInput = styled.input`
  border-style: solid;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 15px;
`;

const StModalTextarea = styled.textarea`
  border-style: solid;
  margin-bottom: 20px;
  font-size: 15px;
`;
