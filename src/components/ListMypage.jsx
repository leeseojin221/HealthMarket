import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { styled } from 'styled-components';
import { db } from '../axios/firebase';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getItems } from '../axios/api';
import { Link } from 'react-router-dom';

function ListMypage() {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery('info', getItems);
  const deleteInfoMutation = useMutation(
    async (id) => {
      const infoRef = doc(db, 'info', id);
      await deleteDoc(infoRef);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('info');
      }
    }
  );
  const deleteInfo = async (id) => {
    deleteInfoMutation.mutate(id);
  };

  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }

  return (
    <div>
      {data.map((Post) => {
        return (
          <ul key={Post.title}>
            <ol>
              <StFlexLists>
                <Link to={`/detailPage/${Post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <StFlex>
                    <StListTitleBox>
                      <StListTitle>{Post.title}</StListTitle>
                    </StListTitleBox>
                    <StListBodyBox>
                      <StListBody>{Post.price}</StListBody>
                    </StListBodyBox>
                  </StFlex>
                </Link>
                <StDbutton onClick={() => deleteInfo(Post.id)}>delete</StDbutton>
                <Link
                  to={`/editPage/${Post.id}`}
                  state={{
                    title: Post.title,
                    price: Post.price,
                    category: Post.category
                  }}
                >
                  <StEbutton>edit</StEbutton>
                </Link>
              </StFlexLists>
            </ol>
          </ul>
        );
      })}
    </div>
  );
}

export default ListMypage;

export const StFlex = styled.div`
  display: flex;
`;
export const StFlexLists = styled.div`
  display: flex;
`;
export const StListTitle = styled.span`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
`;
export const StListTitleBox = styled.div`
  border-bottom: 2px solid black;
  width: 100px;
  padding: 4px;
  margin-right: 30px;
`;
export const StListBodyBox = styled.div`
  border-bottom: 2px solid black;
  width: 400px;
  padding: 4px;
`;
export const StListBody = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
`;
export const StDbutton = styled.button`
  transform: translate(20px, 5px);
  width: 80px;
  height: 30px;
  font-size: 20px;
`;
export const StEbutton = styled.button`
  transform: translate(30px, 5px);
  width: 80px;
  height: 30px;
  font-size: 20px;
`;
