import React, { useState } from 'react';
import styled from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../axios/firebase';
import { auth } from '../axios/firebase';
import { useMutation, useQueryClient } from 'react-query';
import { addHealth } from '../axios/api';

function WriteModal({ setIsModalOpen }) {
  const user = auth.currentUser; // 로그인된 사용자 정보 가져오기
  const loggedInUserEmail = user ? user.email : null; // 로그인된 사용자의 이메일

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [img, setImg] = useState('');

  const options = [
    { value: '0', name: '선택해주세요' },
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' }
  ];

  const [selectedCategory, setSelectedCategory] = useState(options[0].value);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [nickname, setNickname] = useState('');
  const [body, setBody] = useState('');

  const queryClient = useQueryClient();

  const addMutation = useMutation(addHealth, {
    onSuccess: () => {
      queryClient.invalidateQueries('info');
      closeModal();
    }
  });

  const handleWrite = async () => {
    const addData = {
      title: title,
      price: price,
      nickname: nickname,
      body: body,
      user: loggedInUserEmail,
      category: selectedCategory,
      img: img
    };
    addMutation.mutate(addData);
  };

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    try {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);
      const imageURL = await getDownloadURL(storageRef);
      setImg(imageURL);
    } catch (error) {
      console.error(`Error uploading image:`, error);
    }
  };

  return (
    <StModal>
      <StModalContainer>
        <div>
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            닫기
          </button>
        </div>
        <input type="file" onChange={handleImageUpload} />
        <input type="text" placeholder="상품명" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="가격" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <input type="text" placeholder="설명" value={body} onChange={(e) => setBody(e.target.value)} />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <button onClick={handleWrite}>작성하기</button>
      </StModalContainer>
    </StModal>
  );
}

export default WriteModal;

const StModal = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: solid 1px black;
  padding: 20px;
  border-radius: 0px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const StModalTitleInput = styled.input`
  border: solid 1px black;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 15px;
`;

const StModalPriceInput = styled.input`
  border: solid 1px black;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 15px;
`;

const StModalTextarea = styled.textarea`
  border: solid 1px black;
  margin-bottom: 20px;
  font-size: 15px;
`;

const StModalCategorySelect = styled.select`
  border: solid 1px black;
  padding: 5px;
  margin-bottom: 20px;
  font-size: 15px;
`;

const StModalContainer = styled.div`
 display: flex;
 flex-direction: column;
 width:  100%;
 height: 100%;
 gap: 10px;
`