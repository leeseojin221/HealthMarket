import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { DeleteButton, EditLinkButton } from '../components/Buttons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteHealth, getHealth } from '../axios/api';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../axios/firebase';

function DetailPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { isLoading, data } = useQuery('info', getHealth);

  const queryClient = useQueryClient();
  const productInfo = data?.find((item) => item.id == id);

  const user = auth.currentUser;
  const loggedInUserEmail = user ? user.email : null;

  const deleteMutation = useMutation(deleteHealth, {
    onSuccess: () => {
      queryClient.invalidateQueries('info');

      // alert('삭제되었습니다.');
      // navigate('/myPage');
    }
  });

  if (isLoading) {
    return <div>로딩중 ...</div>;
  }

  // if (!productInfo) {
  //   return <div>상품 정보를 찾을 수 없습니다.</div>;
  // }

  const handleDelete = async () => {
    const isDeletable = window.confirm('정말 삭제하시겠습니까?');
    if (isDeletable) {
      try {
        await deleteMutation.mutate(id);
        // alert('삭제되었습니다.');
        navigate('/myPage');
      } catch (error) {
        alert('오류가 발생했습니다', error);
      }
    }
  };

  return (
    <StContainer>
      {/* {productInfo && ( */}
      <>
        <StLeftColumn>
          <StImgDiv>
            <img src={productInfo.img} alt="제품"></img>
          </StImgDiv>
        </StLeftColumn>
        <StRightColumn>
          <StProductDetails>
            <StContainerBtn>
              {productInfo.user == loggedInUserEmail && (
                <>
                  <EditLinkButton id={id} loggedInUserEmail={loggedInUserEmail} productInfo={productInfo} />
                  <DeleteButton handleDelete={handleDelete} />
                </>
              )}
            </StContainerBtn>
            <div>
              <div>
                <StInfoTitle>상품명</StInfoTitle>
                <StInfoText>{productInfo.title}</StInfoText>
              </div>
              <div>
                <StInfoTitle>가격</StInfoTitle>
                <StInfoText>{productInfo.price} 원</StInfoText>
              </div>
              <div>
                <StInfoTitle>판매자정보</StInfoTitle>
                <StInfoText>{productInfo.SellerInformation}</StInfoText>
              </div>
              <div>
                <StInfoTitle>설명</StInfoTitle>
                <StDescription>{productInfo.body}</StDescription>
              </div>
            </div>
          </StProductDetails>
        </StRightColumn>
      </>
      {/* )
      } */}
    </StContainer>
  );
}

export default DetailPage;

const StContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const StLeftColumn = styled.div`
  /* width: 100%; */
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StRightColumn = styled.div`
  width: 500px;
  padding-left: 20px;
`;

const StImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0px solid black;
  /* padding: 20px; */
  margin: 20px;
  border-radius: 5px;
  /* justify-content: center; */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 500px;

  img {
    /* max-width: 100%;
    max-height: 100%; */
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* margin-bottom: 10px; */
    border-radius: 5px;
  }

  input {
    margin-top: 10px;
  }
`;

const StDescription = styled.div`
  /* margin-top: 10px; */
  /* margin-left: 20px; */
  font-weight: bold;
  padding: 20px;
  width: 500px;
  height: 100px;
  align-items: center;
  background-color: rgb(233, 233, 233);
  border: 0;
  border-radius: 10px;
  outline: none;
`;

const StProductDetails = styled.div`
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* column-gap: 20px; */
  /* margin-top: 20px; */
  padding: 20px;

  /* .sellerDiv {
    border-top: 100px solid transparent;
    padding-top: 20px;
    border-bottom: 1px solid black;
  }

  .div.buttonsContainer {
    margin-top: 100px;
  } */
`;

// const sellerDiv = styled.div`
//   height: 80px;
// `;

const StContainerBtn = styled.div`
  margin-bottom: 50px;
  /* margin-left: 30%; */
`;

const StInfoTitle = styled.div`
  width: 100px;
  height: 30px;
  margin-top: 20px;
  margin-left: 5px;
`;

const StInfoText = styled.div`
  width: 250px;
  height: 30px;
  text-align: center;
  justify-content: center;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;
