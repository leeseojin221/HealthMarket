import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { useState } from 'react';
import { CancelButton, EditButton } from '../components/Buttons';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editHealth, getHealth } from '../axios/api';
import { storage } from './../axios/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
function EditPage() {
  const { id } = useParams();
  // console.log('id=>', id);
  const { isLoading, data } = useQuery('info', getHealth);
  const productInfo = data?.find((item) => item.id == id);
  // console.log('productInfo=>', productInfo.title);
  // console.log('id=>', id);
  // console.log('data=>', data);
  // console.log('productInfo=>', productInfo);
  const queryClient = useQueryClient();
  const editProductMutation = useMutation((updatedData) => editHealth(id, updatedData), {
    onSuccess: (response) => {
      console.log('mutation API', response);
      queryClient.invalidateQueries('info');
    }
  });
  const navigate = useNavigate();
  // 추가
  const [editImage, setEditImage] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedSellerInfo, setEditedSellerInfo] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  // console.log('editedTitle=>', editedTitle);
  useEffect(() => {
    if (!productInfo) {
      return;
    }
    setEditImage(productInfo.img);
    setEditedTitle(productInfo.title);
    setEditedPrice(productInfo.price);
    setEditedSellerInfo(productInfo.SellerInformation);
    setEditedDescription(productInfo.body);
  }, [productInfo]);
  if (isLoading) {
    return <div>로딩중 ...</div>;
  }
  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    // setEditImage(URL.createObjectURL(selectedImage));
    try {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);
      const imageURL = await getDownloadURL(storageRef);
      setEditImage(imageURL);
    } catch (error) {
      console.error(`Error uploading image:`, error);
    }
  };
  // 추가
  const editHandler = async () => {
    const updatedData = {
      title: editedTitle,
      price: editedPrice,
      SellerInformation: editedSellerInfo,
      body: editedDescription,
      img: editImage
    };
    try {
      // console.log('이전mutate');
      await editProductMutation.mutate(updatedData);
      // console.log('이후mutate');
      // 추가부분
      queryClient.invalidateQueries('info');
      alert('수정이완료되었습니다.');
      navigate('/myPage');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  return (
    <StContainer>
      <StLeftColumn>
        <StImgDiv>
          {editImage ? <img src={editImage} alt="이미지" /> : <p>이미지를 선택하세요</p>}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </StImgDiv>
      </StLeftColumn>
      <StRightColumn>
        <StProductDetails>
          <StContainerBtn>
            <EditButton editHandler={editHandler} />
            <CancelButton id={id} />
          </StContainerBtn>
          <StInfoTextWrapDiv>
            <div>
              <StInfoText>상품명 </StInfoText>
              <StInfoInput
                type="text"
                value={editedTitle}
                onChange={(e) => {
                  setEditedTitle(e.target.value);
                }}
              />
            </div>
            <div>
              <StInfoText>가 격 </StInfoText>
              <StInfoInput
                type="text"
                value={editedPrice}
                onChange={(e) => {
                  setEditedPrice(e.target.value);
                }}
              />
            </div>
            <div>
              <StInfoText>판매자정보 </StInfoText>
              <StInfoInput
                type="text"
                value={editedSellerInfo}
                onChange={(e) => {
                  setEditedSellerInfo(e.target.value);
                }}
              />
              <div>
                <StInfoText>설명</StInfoText>
                <StDescription
                  value={editedDescription}
                  onChange={(e) => {
                    setEditedDescription(e.target.value);
                  }}
                />
              </div>
            </div>
          </StInfoTextWrapDiv>
        </StProductDetails>
      </StRightColumn>
    </StContainer>
  );
}

export default EditPage;

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

const StDescription = styled.textarea`
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
`;
const StContainerBtn = styled.div`
  margin-bottom: 50px;
  width: 800px;
`;
const StDescriptionDiv = styled.div`
  padding: 20px;
`;
const StInfoTextWrapDiv = styled.div`
  width: 300px;
  height: 500px;
  /* margin-left: -150px; */
`;
const StInfoText = styled.div`
  width: 100px;
  height: 30px;
  margin-top: 20px;
  margin-left: 5px;
`;
const StInfoInput = styled.input`
  width: 250px;
  height: 30px;
  text-align: center;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;
