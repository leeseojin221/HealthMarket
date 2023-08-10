import React, { useState } from 'react';
import { EditLinkButton, DeleteButton } from '../components/Buttons';
import Modal from '../form/WriteModal';
import styled from 'styled-components';
import { getItems } from '../axios/api';
import ListMypage from '../components/ListMypage';

// 회원정보 : e-mail 확인 가능하도록.
// 회원사진 : firebase에서 아이디에 저장된 사진 불러오기.
// 글쓰기 : 클릭 시 글 작성 모달 생성 (사진, 상품명, 가격, 닉네임, 설명)
// ㄴ 작성글 ID : 타이틀값.
// 글목록 : 작성한 글 목록 불러오기.

function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleWrite = () => {
    // 작성 버튼을 누를 때 실행될 로직 작성 필요.
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
          <StList>
            <StListTitle>글목록</StListTitle>
            <StFlex>
              <StListTitleBox>TITLE</StListTitleBox>
              <StListBodyBox>PRICE</StListBodyBox>
            </StFlex>
            <ListMypage></ListMypage>
          </StList>
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
