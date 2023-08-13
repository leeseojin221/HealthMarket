import React, { useState } from 'react';
import { EditLinkButton, DeleteButton } from '../components/Buttons';
import Modal from '../form/WriteModal';
import styled from 'styled-components';
import { getItems, deleteHealth } from '../axios/api';
import { auth } from '../axios/firebase';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

function MyPage() {
  const navigate = useNavigate();
  const { data: userItemsData, isLoading: userItemsLoading } = useQuery('info', getItems);
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
        <StUserWrap>
          <StUserInfo isModalOpen={isModalOpen}>회원정보</StUserInfo>
          <StUserImg isModalOpen={isModalOpen}>회원사진</StUserImg>
        </StUserWrap>
        <StWriteButton onClick={handleWriteButtonClick} isModalOpen={isModalOpen}>
          글쓰기
        </StWriteButton>
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
        <StUserList isModalOpen={isModalOpen}>작성한 글목록</StUserList>
        <StUserListText isModalOpen={isModalOpen}>
          {filteredUserEmail.map((item) => (
            <div key={item.id}>
              <Link to={`/detailPage/${item.id}`}>{item.title}</Link>
              <EditLinkButton id={item.id} />
              <DeleteButton
                handleDelete={() => {
                  handleDelete(item.id);
                }}
              />
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

export const StMyPagebox = styled.div`
  background-color: #ececf1;
  width: 1000px;
  height: 700px;
  padding: 20px;
  border-radius: 20px;
`;
