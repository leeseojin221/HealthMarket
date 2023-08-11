import React, { useState } from 'react';
import styled from 'styled-components';
import { addHealth } from '../axios/api';

function WriteModal({ isOpen, onClose, onUpload, children }) {
  const options = [
    { value: '0', name: '선택해주세요' },
    { value: '1', name: '1' },
    { value: '2', name: '2' },
    { value: '3', name: '3' },
    { value: '4', name: '4' }
  ];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [priec, setPriec] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(options[0].value);

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleUpload = async () => {
    try {
      await addHealth(title, priec, content, selectedCategory);
      onClose();
    } catch (error) {
      console.error('Error adding health: ', error);
    }
    window.location.reload('/');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <StModal>
      <h2>글 작성</h2>
      <StModalTitleInput type="text" placeholder="제목" value={title} onChange={handleTitleChange} />
      <StModalPriceInput type="text" placeholder="가격" value={priec} onChange={handlePriceChange} />
      <StModalTextarea placeholder="내용" value={content} onChange={handleContentChange} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <StModalCategorySelect value={selectedCategory} onChange={handleCategoryChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </StModalCategorySelect>
      <button onClick={handleUpload}>작성</button>
      <button onClick={onClose}>닫기</button>
    </StModal>
  );
}

export default WriteModal;

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

const StModalCategorySelect = styled.select`
  border-style: solid;
  padding: 5px;
  margin-bottom: 20px;
  font-size: 15px;
`;
