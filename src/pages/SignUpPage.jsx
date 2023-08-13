import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import healthmarket_logo from '../assets/healthmarket_logo.png';
import { useNavigate } from 'react-router-dom';
import { auth } from '../axios/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SignupButton, SigninButton } from '../components/Buttons';
import { debounce } from 'lodash';
import {
  alreadyInUseEmailError,
  validEmailError,
  weakPWError,
  emptyPWError,
  confirmPWError,
  signupSuccess,
  failedError
} from '../components/Alert';

function SignUpPage() {
  const navigate = useNavigate();

  // 회원가입시 필요한 정보
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //debounce
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidpassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const debounceValidateEmail = debounce((email) => {
    const result = validateEmail(email);
    setValidEmail(result);
  }, 500);

  useEffect(() => {
    if (email) {
      debounceValidateEmail(email);
    }
  }, [email]);

  const debounceValidatePassword = debounce((password) => {
    if (password.length > 0 && password.length < 6) {
      setValidpassword('비밀번호는 6자 이상이어야 합니다.');
    } else {
      setValidpassword('');
    }
  }, 1000);

  useEffect(() => {
    debounceValidatePassword(password);
  }, [password]);

  const debounceValidateConfirmPassword = debounce((password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다');
    } else {
      setConfirmPasswordError('');
    }
  }, 1000);

  useEffect(() => {
    debounceValidateConfirmPassword(password, confirmPassword);
  }, [password, confirmPassword]);

  const Signup = async (e) => {
    e.preventDefault();
    if (!email || !validEmail) {
      validEmailError();
    } else if (!password || !confirmPassword) {
      emptyPWError();
    } else if (password !== confirmPassword) {
      confirmPWError();
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        signupSuccess();
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          alreadyInUseEmailError();
        } else if (error.code === 'auth/weak-password') {
          weakPWError();
        } else if (error.code === 'auth/invalid-email') {
          validEmailError();
        } else {
          failedError();
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
              {!validEmail && email.length > 0 && <div>유효한 이메일이 아닙니다.</div>}
            </div>
            <div>
              <StSignInput
                placeholder="비밀번호"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
              />
              {password.length > 0 && password.length < 6 && <div>비밀번호는 6자 이상이어야 합니다.</div>}
            </div>
            <div>
              <StSignInput
                placeholder="비밀번호확인"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
              />
              {confirmPasswordError && <div>{confirmPasswordError}</div>}
            </div>
            <div>
              <SignupButton onClick={Signup}>회원가입</SignupButton>
              <SigninButton
                onClick={() => {
                  navigate('/signinPage');
                }}
              >
                로그인하러가기
              </SigninButton>
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
  background-color: white;
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
