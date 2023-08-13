import React, { useState, useEffect } from 'react';
import { EditLinkButton, DeleteButton } from '../components/Buttons';
import Modal from '../form/WriteModal';
import styled from 'styled-components';
import { getItems } from '../axios/api';
import { auth, db } from '../axios/firebase';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { storage } from '../axios/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// 회원정보 : e-mail 확인 가능하도록.
// 회원사진 : firebase에서 아이디에 저장된 사진 불러오기.
// 글쓰기 : 클릭 시 글 작성 모달 생성 (사진, 상품명, 가격, 닉네임, 설명)
// ㄴ 작성글 ID : 타이틀값.

function MyPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userItemsData, isLoading: userItemsLoading } = useQuery('info', getItems);
  const userItems = userItemsData || [];

  const user = auth.currentUser; // 로그인된 사용자 정보 가져오기
  const loggedInUserEmail = user ? user.email : null; // 로그인된 사용자의 이메일
  const filteredUserEmail = userItems.filter((item) => item.id === loggedInUserEmail);

  console.log(loggedInUserEmail);
  console.log(filteredUserEmail);

  const openModal = () => {
    setIsModalOpen(true);
  };

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
  console.log('옵션', options);
  const [selectedCategory, setSelectedCategory] = useState(options[0].value);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [nickname, setNickname] = useState('');
  const [body, setBody] = useState('');

  const handleWrite = async () => {
    const docRef = await addDoc(collection(db, 'info'), {
      title: productTitle,
      price: productPrice,
      nickname: nickname,
      body: body,
      id: loggedInUserEmail,
      category: selectedCategory,
      img: img
    });

    console.log('Document written with ID: ', docRef.id);
    closeModal();
  };

  const handleImageUpload = async (e) => {
    console.log('사진 올리기 ');
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
    <>
      <StMyContainer>
        <StUserWrap>
          <StUserInfo isModalOpen={isModalOpen}>회원정보</StUserInfo>
          <StUserImg isModalOpen={isModalOpen}>회원사진</StUserImg>
        </StUserWrap>
        <StWriteButton onClick={openModal} isModalOpen={isModalOpen}>
          글쓰기
        </StWriteButton>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="modal-content">
              <input type="file" onChange={handleImageUpload} />
              <input
                type="text"
                placeholder="상품명"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="가격"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
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
            </div>
          </Modal>
        )}
        <StUserList isModalOpen={isModalOpen}>작성한 글목록</StUserList>
        <StUserListText isModalOpen={isModalOpen}>
          {filteredUserEmail.map((item) => (
            <div key={item.id}>
              <Link to={`/detail/${item.id}`}>{item.title}</Link>
              <EditLinkButton />
              <DeleteButton />
            </div>
          ))}
        </StUserListText>
      </StMyContainer>
    </>
  );
}

export default MyPage;

const StUserInfo = styled.span`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
`;
const StUserImg = styled.span`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
`;
const StWriteButton = styled.button`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
`;
const StUserList = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
`;
const StUserListText = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
`;

const StUserWrap = styled.div`
  display: flex;
  align-items: center;
`;
const StMyContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const StFlex = styled.div`
  transform: translate(80px, 0px);
  display: flex;
  margin-bottom: 30px;
`;

const StListTitle = styled.div`
  transform: translate(85px, 0px);
  margin: 50px auto 50px auto;
  font-size: 25px;
  font-weight: bolder;
  text-decoration-line: none;
  color: black;
`;

export const StListTitleBox = styled.div`
  width: 250px;
  padding: 4px;
  margin-right: 30px;
  font-size: 20px;
  font-weight: bolder;
  color: black;
`;
export const StListBodyBox = styled.div`
  width: 600px;
  padding: 4px;
  font-size: 20px;
  font-weight: bolder;
  color: black;
`;

const StList = styled.div`
  text-decoration: none;
  color: white;
`;
