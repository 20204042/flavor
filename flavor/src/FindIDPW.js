import React from 'react';
import { Link } from 'react-router-dom';

const FindIDPW = () => (
  <div>
    <style>
      {`
        body {
          font-family: Raleway, sans-serif;
          background-color: #ffd9c6;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .container {
          width: 360px;
          height: 700px;
          background-color: #ffffff;
          border: none;
          border-radius: 5px;
          box-shadow: 0px 0px 24px #ffaebd;
          padding: 0 20px;
        }

        .flavor_logo {
          background-color: #ffffff;
          border: none;
          cursor: pointer;
          margin-top: 20px;
        }

        .id_container {
          top: 4px;
          left: 40px;
        }

        .pw_container {
          top: 94px;
          left: 40px;
        }

        h3 {
          top: 6px;
          left: 60px;
          color: #333333;
          margin-bottom: 12px;
        }

        .line {
          top: 65px;
          border: 0.1px solid #dadada;
          width: 320px;
          height: 0.1px;
          margin: 0 auto;
        }

        .box_click:active,
        .box_click:focus,
        .box_click:hover {
          outline: none;
          border-color: #ff6480;
        }

        input[type="name"] {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #cccccc;
          margin: 6px 0px 12px 24px;
        }

        input[type="id"],
        input[type="email"] {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #cccccc;
          margin: 2px 0px 12px 8px;
        }

        input[type="submit"] {
          top: 20px;
          left: 60px;
          background-color: #ff6480;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }

        input[type="submit"]:hover {
          background-color: #b4475b;
        }
      `}
    </style>

    <div className="container">
      <div className="form-container">
        <Link to="/">
          <button type="flavor_logo" className="flavor_logo">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
          </button>
        </Link>
          <form action="아이디 찾기 결과 페이지 URL" method="POST">
            <div className="id_container">
              <h3>아이디 찾기</h3>
                <div>
                  <label htmlFor="find_id_name">이름</label>
                  <input type="name" id="find_id_name" name="find_id_name" className="box_click" placeholder="이름을 입력하세요" required />
                  <span className="error_message" id="name_error"></span>
                </div>
                <div>
                  <label htmlFor="find_id_email">이메일</label>
                  <input type="email" id="find_id_email" name="find_id_email" className="box_click" placeholder="이메일을 입력하세요" required />
                </div>
              <input type="submit" value="아이디 찾기" />
            </div>
          </form>
      </div>
      <div className="line"></div>
      <div className="form-container">
        <form action="비밀번호 찾기 결과 페이지 URL" method="POST">
          <div className="pw_container">
            <h3>비밀번호 찾기</h3>
            <div>
              <label htmlFor="find_pw_name">이름</label>
              <input type="name" id="find_pw_name" name="find_pw_name" className="box_click" placeholder="이름을 입력하세요" required />
            </div>
            <div>
              <label htmlFor="find_pw_id">아이디</label>
              <input type="id" id="find_pw_id" name="find_pw_id" className="box_click" placeholder="아이디를 입력하세요" required />
            </div>
            <div>
              <label htmlFor="find_pw_email">이메일</label>
              <input type="email" id="find_pw_email" name="find_pw_email" className="box_click" placeholder="이메일을 입력하세요" required />
            </div>
            <input type="submit" value="비밀번호 찾기" />
          </div>
          </form>
      </div>
    </div>
  </div>
);

export default FindIDPW;