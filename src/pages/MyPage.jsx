import React, { useState } from 'react';
import { EditLinkButton, DeleteButton } from '../components/Buttons';
import Modal from '../form/WriteModal';
import styled from 'styled-components';
import { getItems, deleteHealth } from '../axios/api';
import { auth } from '../axios/firebase';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import health from '../assets/healthmarket_logo.png';

function MyPage() {
  const navigate = useNavigate();
  const { data: userItemsData } = useQuery('info', getItems);
  const userItems = userItemsData || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = auth.currentUser;
  const loggedInUserEmail = user ? user.email : null;
  const filteredUserEmail = userItems.filter((item) => item.user === loggedInUserEmail);

  const handleWriteButtonClick = () => {
    const user = auth.currentUser;

    if (user) {
      setIsModalOpen(true);
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const queryClient = useQueryClient();

  const handleDelete = async (id) => {
    const isDeletable = window.confirm('정말 삭제하시겠습니까?');
    if (isDeletable) {
      try {
        await deleteMutation.mutate(id);
        alert('삭제되었습니다.');
        navigate('/myPage');
      } catch (error) {
        alert('오류가 발생했습니다', error);
      }
    }
  };

  const deleteMutation = useMutation(deleteHealth, {
    onSuccess: () => {
      queryClient.invalidateQueries('info');
    }
  });

  return (
    <>
      <StMyContainer>
        <StUserWrap isModalOpen={isModalOpen}>
          <StUserImg>
            <StImg src={health} />
          </StUserImg>
        </StUserWrap>
        <StUserInfo>{loggedInUserEmail}</StUserInfo>
        <StListWriteWrap>
          <StUserList isModalOpen={isModalOpen}>내가 작성한 글</StUserList>
          <StWriteButton onClick={handleWriteButtonClick} isModalOpen={isModalOpen}>
            글쓰기
          </StWriteButton>
        </StListWriteWrap>
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}

        <StUserListText isModalOpen={isModalOpen}>
          {filteredUserEmail.map((item) => (
            <StListWrap key={item.id}>
              <Link
                to={`/detailPage/${item.id}`}
                style={{ textDecoration: 'none', color: '#000', fontSize: '15px', marginTop: '8px' }}
              >
                {item.title}
              </Link>
              <StButtons>
                <EditLinkButton id={item.id} />
                <DeleteButton
                  handleDelete={() => {
                    handleDelete(item.id);
                  }}
                />
              </StButtons>
            </StListWrap>
          ))}
        </StUserListText>
      </StMyContainer>
    </>
  );
}

export default MyPage;

const StUserInfo = styled.div`
  width: 230px;
  height: 24px;
  position: relative;
  background-color: rgb(233, 233, 233);
  text-align: center;
  margin-bottom: 100px;
`;
const StUserImg = styled.div`
  width: 230px;
  height: 230px;
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
  border: solid 1px black;
  border-radius: 100%;
`;
const StWriteButton = styled.button`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
`;
const StUserList = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
  font-size: 30px;
`;
const StUserListText = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'block')};
  margin-top: -15px;
  width: 100%;
`;

const StUserWrap = styled.div`
  display: ${({ isModalOpen }) => (isModalOpen ? 'none' : 'flex')};
`;
const StMyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const StListWrap = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #000;
  border-radius: 5px;
`;

const StButtons = styled.div`
  margin: 3px 0px 3px 0px;
`;

const StListWriteWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StMyPagebox = styled.div`
  background-color: #ececf1;
  width: 1000px;
  height: 700px;
  padding: 20px;
  border-radius: 20px;
`;
