import React from 'react';
import { styled } from 'styled-components';
import { useState } from 'react';
import { CancelButton, EditButton } from '../components/Buttons';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getHealth } from '../axios/api';

function DetailPage() {
  const [image, setImage] = useState(null);

  const { id } = useParams();
  console.log('id=>', id);

  const { isLoading, data } = useQuery('info', getHealth);

  if (isLoading) {
    return <div>로딩중 ...</div>;
  }

  const productInfo = data.find((item) => item.id == id);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  return (
    <StContainer>
      <StLeftColumn>
        <StImgDiv>
          {image ? <img src={image} alt="이미지" /> : <p>이미지를 선택하세요</p>}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </StImgDiv>
        <StDescription>설명:{productInfo.body}</StDescription>
      </StLeftColumn>
      <StRightColumn>
        <StProductDetails>
          <StContainerBtn>
            <EditButton />
            <CancelButton id={id} />
          </StContainerBtn>
          <div>
            <p>상품명:{productInfo.title}</p>
            <p>가격:{productInfo.price}</p>
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
`;

const StContainerBtn = styled.div`
  margin-bottom: 50px;
`;
