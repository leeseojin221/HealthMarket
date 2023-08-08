import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { DeleteButton, EditLinkButton } from '../components/Buttons';
import firebaseApp, { db } from '../axios/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { getHealth } from '../axios/api';
import { useParams } from 'react-router-dom';

function DetailPage() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'info'));
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   };
  //   fetchData();
  // }, []);

  const { id } = useParams();

  // console.log('id=>', id);

  const { isLoading, data } = useQuery('info', getHealth);
  console.log('data=>', data);

  if (isLoading) {
    return <div>로딩중 ...</div>;
  }

  const productInfo = data.find((item) => item.id == id);
  console.log('productInfo=>', productInfo);

  // 지정된아이디값을 뿌려주기위해 만들었는데 id값이 읽혀오지않는다..
  // 배열을 가져온거니깐
  // 배열매소드를 가지고 데이터를 찾는다. find 사용
  // const productInfo = data[id];
  // console.log('productInfo=>', productInfo);

  return (
    <StContainer>
      <StLeftColumn>
        <StImgDiv>
          <img></img>
        </StImgDiv>
        <StDescription>설명:{productInfo.body}</StDescription>
      </StLeftColumn>
      <StRightColumn>
        <StProductDetails>
          <StContainerBtn>
            <EditLinkButton id={id} />
            <DeleteButton />
          </StContainerBtn>
          <div>
            <p>상품명: {productInfo.title} </p>
            <p>가격: {productInfo.price}</p>
            <div>판매자정보:{productInfo.SellerInformation}</div>
          </div>
        </StProductDetails>
      </StRightColumn>
    </StContainer>
  );
}

export default DetailPage;

const StContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StLeftColumn = styled.div`
  width: 40%;
`;

const StRightColumn = styled.div`
  width: 300px;
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
