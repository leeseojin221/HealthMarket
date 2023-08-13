import React, { useState } from 'react';
import styled from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../axios/firebase';
import { auth } from '../axios/firebase';
import { useMutation, useQueryClient } from 'react-query';
import { addHealth } from '../axios/api';
import { ClossButton, WriteButton } from '../components/Buttons';

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

  const [selectedFileName, setSelectedFileName] = useState('선택한 파일 없음');

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    try {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);
      const imageURL = await getDownloadURL(storageRef);
      setImg(imageURL);
      setSelectedFileName(selectedImage.name);
    } catch (error) {
      console.error(`Error uploading image:`, error);
    }
  };

  const ClossModal = () => {
    setIsModalOpen(false);
  };

  return (
    <StModal>
      <StModalContainer>
        <div>
          <ClossButton ClossModal={ClossModal} />
        </div>
        <StFileInput>
          <label htmlFor="fileInput">파일 선택</label>
          <span>{selectedFileName}</span>
          <input type="file" id="fileInput" onChange={handleImageUpload} />
        </StFileInput>
        <StTextInput type="text" placeholder="상품명" value={title} onChange={(e) => setTitle(e.target.value)} />
        <StTextInput type="text" placeholder="가격" value={price} onChange={(e) => setPrice(e.target.value)} />
        <StTextInput type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <StDescriptionInput type="text" placeholder="설명" value={body} onChange={(e) => setBody(e.target.value)} />
        <StSelect value={selectedCategory} onChange={handleCategoryChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </StSelect>
        <WriteButton handleWrite={handleWrite} />
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
  border-radius: 10px;
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
  width: 100%;
  height: 100%;
  gap: 10px;
`;

// const StInputBox = styled.input`
//   align-items: center;
//   /* margin: 5px; */
//   margin-right: 10px;
//   width: 100px;
//   height: 30px;
//   border-radius: 7px;
//   /* padding: 10px 15px; */
//   background-color: #dddff0;
//   color: #1a4475;
//   border: none;
//   border-radius: 12px;
//   font-weight: 700;
//   text-align: center;
//   cursor: pointer;

//   &:hover {
//     background-color: #1a4475;
//     color: #dddff0;
//     transition: all 0.3s;
//   }
// `;

const StTextInput = styled.input`
  width: 250px;
  height: 30px;
  justify-content: center;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;

const StDescriptionInput = styled.input`
  font-weight: bold;
  padding-left: 10px;
  width: 250px;
  height: 100px;
  /* align-items: center; */
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 10px;
  outline: none;
`;

const StSelect = styled.select`
  border-radius: 0;
  background: none transparent;
  font-size: inherit;
  color: inherit;
  box-sizing: content-box;
  margin: 0;
  width: 120px;
  border-radius: 0.5rem;
  padding: 10px;
  box-shadow: none;
  box-sizing: border-box;
  display: block;
  width: 100%;
  border: 2px solid #ddd;
  line-height: 1.06;
`;

const StFileInput = styled.div`
  label {
    display: inline-block;
    padding: 8px 12px;
    background-color: #dddff0;
    color: #1a4475;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    font-weight: 700;
  }

  label:hover {
    background-color: #1a4475;
    color: #dddff0;
  }

  input[type='file'] {
    display: none;
  }
`;
