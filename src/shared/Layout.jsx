import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import healthmarket_logo from '../assets/healthmarket_logo.png';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../axios/firebase';

const StHeader = styled.div`
  width: 100%;
  background: #1a4475;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e9e6d8;
  font-weight: 600;
  position: relative;
`;

const StAuthLink = styled.div`
  display: flex;
  gap: 20px;
`;

const StAuth = styled.div`
  cursor: pointer;
`;

const StFooter = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  background: #1a4475;
  color: #e9e6d8;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const StFooterP = styled.div`
  margin: 3px 0px 0px 20px;
  font-size: 15px;
`;

const StLayout = styled.div`
  color: black;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  padding: 40px;
  /* font-family: 'Hahmlet', serif; */
`;

const StLogo = styled.img`
  width: 150px;
  height: auto;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();

  //로그아웃
  const [currentUser, setCurrentUser] = useState(null);

  const Logout = async () => {
    const confirmLogout = window.confirm('로그아웃하시겠습니까?');
    if (confirmLogout) {
      await signOut(auth);
      setCurrentUser(null); // 이용자 정보 초기화 하기
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user?.email);
    });
  }, []);

  return (
    <>
      {currentUser ? (
        <StHeader>
          <StLogo src={healthmarket_logo} onClick={() => navigate('/')} />
          <StAuthLink>
            <div>
              <div>{currentUser}</div>
              <button onClick={Logout}>로그아웃</button>
            </div>
          </StAuthLink>
        </StHeader>
      ) : (
        <StHeader>
          <StLogo src={healthmarket_logo} onClick={() => navigate('/')} />
          <StAuthLink>
            <StAuth
              onClick={() => {
                navigate('/signinPage');
              }}
            >
              로그인
            </StAuth>
            <StAuth
              onClick={() => {
                navigate('/signupPage');
              }}
            >
              회원가입
            </StAuth>
          </StAuthLink>
        </StHeader>
      )}
    </>
  );
}

function Footer() {
  return (
    <StFooter>
      <span>
        <StFooterP>Copyright © 9인9직. 2023 All Rights Reserved.</StFooterP>
      </span>
    </StFooter>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      <StLayout>{children}</StLayout>
      <Footer />
    </div>
  );
}

export default Layout;
