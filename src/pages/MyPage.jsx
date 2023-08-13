import React, { useState, useEffect } from 'react';
import { EditLinkButton, DeleteButton } from '../components/Buttons';
import Modal from '../form/WriteModal';
import styled from 'styled-components';
import { getItems } from '../axios/api';
import { auth, db } from '../axios/firebase';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

// 회원정보 : e-mail 확인 가능하도록.
// 회원사진 : firebase에서 아이디에 저장된 사진 불러오기.
// 글쓰기 : 클릭 시 글 작성 모달 생성 (사진, 상품명, 가격, 닉네임, 설명)
// ㄴ 작성글 ID : 타이틀값.

function MyPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userItemsData, isLoading: userItemsLoading } = useQuery('info', getItems);
  console.log('data=>', userItemsData);
  const userItems = userItemsData || [];
  // console.log('userItems=>', userItems);

  const user = auth.currentUser; // 로그인된 사용자 정보 가져오기
  const loggedInUserEmail = user ? user.email : null; // 로그인된 사용자의 이메일
  const filteredUserEmail = userItems.filter((item) => item.id === loggedInUserEmail);
  // console.log('filteredUserEmail=>', filteredUserEmail);

  // console.log(loggedInUserEmail);
  // console.log('filteredUserEmail=>', filteredUserEmail);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleWrite = async () => {
    await setDoc(doc(db, 'info', 'LA'), {
      category: '카테고리',
      id: '이메일',
      price: '가격',
      title: '닉네임'
    });
    closeModal();
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
              <input type="file" />
              <input type="text" placeholder="상품명" />
              <input type="text" placeholder="가격" />
              <input type="text" placeholder="닉네임" />
              <textarea placeholder="설명" />
              <button onClick={handleWrite}>작성하기</button>
            </div>
          </Modal>
        )}
        <StUserList isModalOpen={isModalOpen}>작성한 글목록</StUserList>
        <StUserListText isModalOpen={isModalOpen}>
          {filteredUserEmail.map((item) => (
            <div key={item.id}>
              <Link to={`/detail/${item.id}`}>{item.title}</Link>
              {/* <Link to={`/detail/${encodeURIComponent(item.firebaseId)}`}>{item.title}</Link> */}
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
  blackground-color: #000;
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
