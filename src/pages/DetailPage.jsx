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
          <StDescription>{productInfo.body}</StDescription>
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
                <p>상품명 : {productInfo.title} </p>
              </div>
              <div>
                <p>가격 : {Number(productInfo.price).toLocaleString()} 원</p>
              </div>
              <div>
                <div>판매자정보 : {productInfo.SellerInformation}</div>
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
`;

const StLeftColumn = styled.div`
  width: 100%;
`;

const StRightColumn = styled.div`
  width: 500px;
`;

const StImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  height: 550px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-bottom: 10px;
  }

  input {
    margin-top: 10px;
  }
`;

const StDescription = styled.div`
  margin-top: 20px;
  font-weight: bold;
  padding: 20px;
  width: 350px;
`;

const StProductDetails = styled.div`
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
  column-gap: 20px;
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
