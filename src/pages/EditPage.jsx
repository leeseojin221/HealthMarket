import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useState } from 'react';
import { CancelButton, EditButton } from '../components/Buttons';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editHealth, getHealth } from '../axios/api';
import { storage } from './../axios/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import WriteModal from '../form/WriteModal';

function EditPage() {
  const { id } = useParams();
  // console.log('id=>', id);

  const { isLoading, data } = useQuery('info', getHealth);
  const productInfo = data?.find((item) => item.id == id);

  // 모달관련 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const navigate = useNavigate();

  // 추가
  const [editImage, setEditImage] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPrice, setEditedPrice] = useState(0);
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
      // console.log('이전mutate');
      await editProductMutation.mutate(updatedData);
      // console.log('이후mutate');
      // 추가부분

      queryClient.invalidateQueries('info');
      alert('수정이 완료 되었습니다.');
      navigate('/myPage');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  // 추가부분
  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   const selectedImage = event.dataTransfer.files[0];
  //   handleImageChange(selectedImage);
  // };

  return (
    <StContainer>
      <StLeftColumn>
        <StImgDiv>
          {editImage ? <img src={editImage} alt="이미지" /> : <p>이미지를 선택하세요</p>}
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          <label htmlFor="imageInput" className="file-input-label">
            파일 업로드
          </label>
          <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} className="file-input" />
        </StImgDiv>
        {/* <div
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          {editImage ? <img src={editImage} alt="이미지" /> : <p>이미지를 선택하세요</p>}
        </div> */}
        <StDescriptionDiv></StDescriptionDiv>
        <StDescription
          value={editedDescription}
          onChange={(e) => {
            setEditedDescription(e.target.value);
          }}
        />
      </StLeftColumn>
      <StRightColumn>
        <StProductDetails>
          <StContainerBtn>
            <EditButton editHandler={editHandler} />
            <CancelButton id={id} />
          </StContainerBtn>
          <div>
            <div>
              상품명{' '}
              <StInputInput
                ref={inputRef}
                type="text"
                value={editedTitle}
                onChange={(e) => {
                  setEditedTitle(e.target.value);
                }}
              />
            </div>
            <div>
              가 격{' '}
              <StInputInput
                type="text"
                value={editedPrice}
                onChange={(e) => {
                  setEditedPrice(e.target.value);
                }}
              />
            </div>
            <div>
              판매자정보{' '}
              <StInputInput
                type="text"
                value={editedSellerInfo}
                onChange={(e) => {
                  setEditedSellerInfo(e.target.value);
                }}
              />
            </div>
          </div>
        </StProductDetails>
      </StRightColumn>
    </StContainer>
  );
}

export default EditPage;

const StContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StLeftColumn = styled.div`
  width: 100%;
`;

const StRightColumn = styled.div`
  width: 300px;
`;

const StImgDiv = styled.div`
  position: relative;
  display: inline-block;

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

  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-bottom: 10px;
  }
  .file-input-label {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color: #f8f8f8; */
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

  /* input {
    margin-top: 10px;
  } */
`;

const StDescription = styled.textarea`
  /* margin-top: 10px; */
  margin-left: 20px;
  font-weight: bold;
  padding: 20px;
  width: 500px;

  align-items: center;
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

const StDescriptionDiv = styled.div`
  padding: 20px;
`;

const StProductDiv = styled.div`
  background-color: 93CCEA;
`;

const StInputInput = styled.input`
  margin-bottom: 20px;
  margin-top: 10px;
  width: 250px;
  border-radius: 0, 0, 1px, 0;

  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
`;
