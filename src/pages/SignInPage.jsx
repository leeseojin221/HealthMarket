import React, { useState } from 'react';
import { styled } from 'styled-components';
import healthmarket_logo from '../assets/healthmarket_logo.png';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  };
  return (
    <>
      <div> </div>
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
                <StSignupBtn>로그인</StSignupBtn>
                <StSigninBtn
                  onClick={() => {
                    navigate('/signUpPage');
                  }}
                >
                  회원가입하러가기
                </StSigninBtn>
              </div>
            </div>
          </StSignForm>
        </StSignInputDiv>
      </StSignup>
    </>
  );
}

export default SignInPage;

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
  padding-top: 100px;
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
