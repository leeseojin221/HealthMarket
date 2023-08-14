import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useState } from 'react';
import { CancelButton, EditButton } from '../components/Buttons';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editHealth, getHealth } from '../axios/api';
import { storage } from './../axios/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { editSuccess } from '../components/Alert';

function EditPage() {
  const { id } = useParams();

  const { isLoading, data } = useQuery('info', getHealth);
  const productInfo = data?.find((item) => item.id == id);

  const queryClient = useQueryClient();
  const editProductMutation = useMutation((updatedData) => editHealth(id, updatedData), {
    onSuccess: (response) => {
      queryClient.invalidateQueries('info');
    }
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const navigate = useNavigate();
  const [editImage, setEditImage] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedSellerInfo, setEditedSellerInfo] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    if (!productInfo) {
      return;
    }
    setEditImage(productInfo.img);
    setEditedTitle(productInfo.title);
    setEditedPrice(productInfo.price);
    setEditedSellerInfo(productInfo.user);
    setEditedDescription(productInfo.body);
  }, [productInfo]);
  if (isLoading) {
    return <div>로딩중 ...</div>;
  }

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    try {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);
      const imageURL = await getDownloadURL(storageRef);
      setEditImage(imageURL);
    } catch (error) {
      console.error(`Error uploading image:`, error);
    }
  };

  const editHandler = async () => {
    if (!editImage || !editedTitle || !editedPrice || !editedSellerInfo || !editedDescription) {
      alert('모든 값을 입력해주세요.');
      return;
    }

    const updatedData = {
      title: editedTitle,
      price: Number(editedPrice),
      SellerInformation: editedSellerInfo,
      body: editedDescription,
      img: editImage
    };
    try {
      await editProductMutation.mutate(updatedData);
      queryClient.invalidateQueries('info');
      editSuccess();
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
          <label htmlFor="imageInput" className="file-input-label">
            파일 업로드
          </label>
          <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} className="file-input" />
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
              <StInfoText>판매자 정보</StInfoText>
              <SellerLabel>{editedSellerInfo}</SellerLabel>
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
  position: relative;
  display: inline-block;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 500px;

  .file-input-label {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: #F8F8F8; */
    padding: 10px 20px;
    /* border: 1px solid #ccc;
    border-radius: 5px; */
    cursor: pointer;
  }
  .file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-bottom: 10px;
  }

  /* input {
    margin-top: 10px;
  } */
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
const SellerLabel = styled.p`
  width: 250px;
  height: 30px;
  text-align: center;
  border: 0;
  border-radius: 10px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);
`;
