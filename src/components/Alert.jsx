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

export const confirmNicknameError = () => {
  Swal.fire({
    icon: 'error',
    title: ' 회원가입 실패 ',
    text: '닉네임을 입력해주세요.'
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

// 모달 관련
export const needAllContent = () => {
  Swal.fire({
    icon: 'error',
    title: ' 글 작성 실패! ',
    text: '모든 항목을 작성해주세요!! '
  });
};

export const addAllContent = () => {
  Swal.fire({
    icon: 'success',
    title: ' 글 작성 성공! ',
    text: '데이터가 추가되었습니다.!! '
  });
};

export const failAllContent = () => {
  Swal.fire({
    icon: 'error',
    title: ' 알 수 없는 오류 ',
    text: ' 잠시 후 다시 시도해주세요. '
  });
};

// 버튼 관련
export const editNavigate = () => {
  Swal.fire({
    icon: 'success',
    title: ' 페이지 이동 ',
    text: '수정페이지로 이동합니다!! ',
    timer: 1200
  });
};

export const deleteSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: ' 삭제 완료 ',
    text: '마이페이지로 이동합니다!! ',
    timer: 800
  });
};

export const needLogin = () => {
  Swal.fire({
    icon: 'success',
    title: ' 로그인 해주세요 ',
    text: ' 잠시후 다시 시도해주세요. ',
    timer: 800
  });
};

export const editSuccess = () => {
  Swal.fire({
    icon: 'success',
    title: ' 수정 완료 ',
    text: '수정이 완료되었습니다!! ',
    timer: 800
  });
};
