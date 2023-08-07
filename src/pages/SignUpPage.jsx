import React from 'react';

function SignUpPage() {
  return (
    <>
      <div>회원가입 페이지</div>
      <div>
        로그인 화면
        <div>사진 들어가는자리</div>
        <div>
          로그인 입력창
          <div>
            <input type="text" placeholder="아이디는 이메일 형식 입니다." />
          </div>
          <div>
            <input type="password" placeholder="비밀번호" />
            <div>
              <input type="password" placeholder="비밀번호 확인" />
            </div>
            <div>
              <button>구글로그인</button>
              <button>깃헙로그인</button>
            </div>
            <div>
              <button>회원가입</button>
              <button>로그인하러가기</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
