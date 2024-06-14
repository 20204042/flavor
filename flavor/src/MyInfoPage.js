import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyInfoPage() {
  
  const [userInfo, setUserInfo] = useState({
    name: "학술제",
    username: "cdflavor1113",
    password: "************",
    birthdate: "2000-11-13",
    email: "cdflavor1113@naver.com",
    phone: "010-1113-1114"
  });

  const logout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      alert("로그아웃 되었습니다.");
    }
  }

  const withdraw = () => {
    const confirmWithdraw = window.confirm("정말로 회원탈퇴 하시겠습니까?");
    if (confirmWithdraw) {
      alert("회원탈퇴 되었습니다.");
    }
  }

  return (
    <div>
      <style>
      {`
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        top: 40px;
        padding: 20px;
      }

      .flavor_logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;
      }
      
      h1 {
        text-align: center;
        font-size: 24px;
      }

      .user_icon {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }

      table {
        margin-left: 10%;
        width: 70%;
        border-collapse: collapse;
      }
      
      th, td {
        left: 50px;
        padding: 10px;
        text-align: left;
      }
      
      th {
        background-color: #f2f2f2;
      }
      
      .button_container {
        text-align: center;
        margin-top: 20px;
      }
      
      .button_container button {
        margin: 20px 15px 0px 15px;
        padding: 8px 16px;
        font-size: 14px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      
      .button_container button.logout {
        background-color: #ffa99a;
        color: #fff;
      }
      
      .button_container button.withdraw {
        background-color: #ad9e98;
        color: #fff;
      }
      `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      <h1>내 정보</h1>
      <div className="user_icon">
        <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcUsojQ%2Fbtsz83BzEqh%2F6x3KSdWcA9V4gkM0ZIW0K1%2Fimg.png" width="120" height="120" alt="user_icon" />
      </div>
      <table>
        <thead>
          <tr>
            <th>항목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>이름</td>
            <td id="name">{userInfo.name}</td>
          </tr>
          <tr>
            <td>아이디</td>
            <td id="username">{userInfo.username}</td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td id="password">{userInfo.password}</td>
          </tr>
          <tr>
            <td>생년월일</td>
            <td id="birthdate">{userInfo.birthdate}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td id="email">{userInfo.email}</td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td id="phone">{userInfo.phone}</td>
          </tr>
        </tbody>
      </table>
      <div className="button_container">
        <button className="logout" onClick={logout}>로그아웃</button>
        <button className="withdraw" onClick={withdraw}>회원탈퇴</button>
      </div>
    </div>
  );
}

export default MyInfoPage;