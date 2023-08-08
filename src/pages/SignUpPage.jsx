import React, { useState } from 'react';
import { styled } from 'styled-components';
import healthmarket_logo from '../assets/healthmarket_logo.png';
import { useNavigate } from 'react-router-dom';
import { auth } from '../axios/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

  const Signup = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('이메일을 입력해주세요');
    } else if (!password || !confirmPassword) {
      alert('비밀번호를 입력해주세요');
    } else if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다');
    }

    if (password === confirmPassword) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert('회원가입에 성공했습니다.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/');
        console.log(userCredential); //user정보 확인하기
      } catch (error) {
        console.error(error.code); //에러메세지 확인하기
        if (error.code === 'auth/email-already-in-use') {
          alert('이미 사용된 이메일입니다.');
        } else if (error.code === 'auth/weak-password') {
          alert('비밀번호가 6자리 이하입니다.');
        } else if (error.code === 'auth/invalid-email') {
          alert('이메일 형식을 확인 해주세요.');
        } else {
          alert('회원가입에 실패 했습니다.');
        }
      }
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
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={onChange}
                />
              </div>
              <div>
                <StSignupBtn onClick={Signup}>회원가입</StSignupBtn>
                <StSigninBtn
                  onClick={() => {
                    navigate('/signinPage');
                  }}
                >
                  로그인하러가기
                </StSigninBtn>
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
