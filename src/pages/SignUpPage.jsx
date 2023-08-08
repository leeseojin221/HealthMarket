import React, { useState } from 'react';
import { styled } from 'styled-components';
import healthmarket_logo from '../assets/healthmarket_logo.png';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();

  // 회원가입시 필요한 정보
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  return (
    <>
      <div></div>
      <StSignup>
        <StSignPic>
          <StLogo src={healthmarket_logo} />
        </StSignPic>
        <StSignInputDiv>
          <StSignForm>
            <div>
              <StSignInput placeholder="이메일" type="email" name="email" value={email} onChange={onChange} />
            </div>
            <div>
              <StSignInput
                placeholder="비밀번호"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
              />
              <div>
                <StSignInput
                  placeholder="비밀번호확인"
                  tname="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={onChange}
                />
              </div>
              <div>
                <StSignupBtn>회원가입</StSignupBtn>
                <StSigninBtn
                  onClick={() => {
                    navigate('/signinPage');
                  }}
                >
                  로그인하러가기
                </StSigninBtn>
              </div>
              <div>
                <StSigninBtnSns>구글로그인</StSigninBtnSns>
                <StSigninBtnSns>깃헙로그인</StSigninBtnSns>
              </div>
            </div>
          </StSignForm>
        </StSignInputDiv>
      </StSignup>
    </>
  );
}

export default SignUpPage;

const StSignup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 500px;
  text-align: center;
  color: #1a4475;
  background-color: #e9e6d8;
  margin: auto;
`;

const StSignPic = styled.div`
  width: 50%;
  height: 500px;
`;

const StSignInputDiv = styled.div`
  width: 50%;
  height: 500px;
`;
const StLogo = styled.img`
  width: 300px;
  height: auto;
  cursor: pointer;
  margin-top: 100px;
`;

const StSignForm = styled.form`
  padding-top: 60px;
`;
const StSignInput = styled.input`
  width: 80%;
  height: 35px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  padding: 8px;
  boxsizing: border-box;
  margin-bottom: 10px;
  margin-top: 5px;
`;

//btn
const StSignupBtn = styled.button`
  width: 80%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background-color: #1a4475;
  color: white;
  cursor: pointer;
`;
const StSigninBtn = styled.button`
  width: 80%;
  border: none;
  padding: 12px;
  border-radius: 6px;
  background-color: white;
  color: #1a4475;
  cursor: pointer;
  margin-top: 9px;
`;
const StSigninBtnSns = styled.button`
  flex: 1;
  border: none;
  padding: 12px;
  border-radius: 6px;
  border: 2px solid #1a4475;
  color: #1a4475;
  cursor: pointer;
  margin-top: 9px;
  margin-right: 5px;
`;
