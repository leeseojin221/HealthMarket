import React from 'react';
import Swal from 'sweetalert2';

function Alert() {
  return <></>;
}

export default Alert;

export const alreadyInUseEmailError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 이메일 오류! ',
    text: '이미 가입되어 있는 이메일 입니다. '
  });
};

export const validEmailError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 이메일 오류! ',
    text: '이메일 형식을 확인 해주세요 . '
  });
};

export const weakPWError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호 오류! ',
    text: '비밀번호는 6자 이상이 되어야 합니다.'
  });
};

export const emptyPWError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호 오류! ',
    text: '비밀 번호는 필수 기재사항입니다 '
  });
};

export const confirmPWError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 비밀번호 오류! ',
    text: '비밀번호가 일치하지 않습니다. '
  });
};

export const signupSuccess = () => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: '회원가입이 완료되었습니다!',
    showConfirmButton: false,
    timer: 1500
  });
};

export const failedError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 회원가입 실패  ',
    text: '오류가 발생 하였습니다 .'
  });
};

//로그인알럿

export const userNotFound = () => {
  Swal.fire({
    icon: 'error',
    title: '로그인 실패',
    text: '가입된 정보가 확인 되지 않습니다.'
  });
};

export const worngPassword = () => {
  Swal.fire({
    icon: 'error',
    title: '로그인 실패',
    text: '비밀번호를 확인 해주세요 '
  });
};

export const invalidEmail = () => {
  Swal.fire({
    icon: 'error',
    title: '로그인 실패',
    text: '이메일 형식을 확인 해주세요 '
  });
};

export const emptyEmailError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 이메일 오류! ',
    text: '이메일은 필수 기재사항입니다 '
  });
};
