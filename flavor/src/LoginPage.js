import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { validateForm } from './LoginValidate';

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);

  const navigate = useNavigate();

  const { naver } = window;
  const { google } = window;

  // Caps Lock 상태 확인 함수
  const checkCapsLock = (event, warningId) => {
    const capsLockWarning = document.getElementById(warningId);
    const capsLockEnabled = event.getModifierState && event.getModifierState('CapsLock');

    if (capsLockEnabled) {
        capsLockWarning.innerText = 'Caps Lock이 켜져있습니다.';
        capsLockWarning.style.display = 'block';
    } else {
        capsLockWarning.style.display = 'none';
    }
  };

  useEffect(() => {
    const userIdCookie = localStorage.getItem('userid');
    const userPasswordCookie = localStorage.getItem('userPassword');
    const keepLoginCookie = localStorage.getItem('keepLogin');

    if (userIdCookie) {
      setId(userIdCookie);
    }

    if (userPasswordCookie) {
      setPassword(userPasswordCookie);
    }

    if (keepLoginCookie) {
      setKeepLogin(keepLoginCookie === 'true');
    }
  }, []);

  // const toggleKeepLogin = () => {
  //   if (keepLogin) {
  //     setKeepLogin(false);
  //     localStorage.removeItem('keepLogin');
  //   } else {
  //     setKeepLogin(true);
  //     localStorage.setItem('keepLogin', 'true');
  //   }
  // };

  const loginUser = async (event) => {
    event.preventDefault();
    validateForm(event);

    if (id && password) {
      const userData = {
        userid: id,
        userPassword: password,
      };
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        const responseData = await response.json();
  
        if (responseData.isLogin === true) {
          alert('로그인되었습니다!');
          if (keepLogin) {
            localStorage.setItem('userid', id);
            localStorage.setItem('userPassword', password);
            localStorage.setItem('keepLogin', 'true');
          }
          navigate(`/?userid=${id}`);
        } else {
          alert('로그인 실패: ' + responseData.message);
        }
      } catch (error) {
        console.error('로그인 오류:', error);
        alert('로그인 중 오류가 발생했습니다.');
      }
    } else if (id && !password) {
      alert('클라이언트 비밀번호 오류!');
    } else if (!id && password) {
      alert('클라이언트 아이디 오류!');
    } else {
      alert('클라이언트 아이디와 비밀번호 오류!');
    }
  }

  /////////////////////////////////////////////////////////
  // 네이버 아이디로 로그인
  const naverLogin = new naver.LoginWithNaverId({
    clientId: "35hkynGDMuefjixhHn51",
    callbackUrl: "http://localhost:3000/login",
    isPopup: false,
    callbackHandle: true
  });

  naverLogin.init();

  window.addEventListener('load', function () {
    naverLogin.getLoginStatus(function (status) {
      if (status) {
        var email = naverLogin.user.getEmail();
        
        console.log(naverLogin.user);
        
        if( email === undefined || email === null) {
          alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
          naverLogin.reprompt();
          return;
        }
      } else {
        console.log("callback 처리에 실패하였습니다.");
      }
    });
  });

  const naverLoginClick = () => {
    naverLogin.reprompt();
  };
  /////////////////////////////////////////////////////////
  // 카카오 아이디로 로그인
  const initKakao = () => {
    const jsKey = "2202c8bfd90caa3b320a643d31e9413f";
    const Kakao = window.Kakao;
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(jsKey);
      console.log(Kakao.isInitialized());
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  const kakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log(authObj);
        navigate('/');
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };
  /////////////////////////////////////////////////////////
  // 페이스북 아이디로 로그인
  useEffect(() => {
    // Facebook SDK 초기화
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '113197181799419',
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });
      window.FB.AppEvents.logPageView();
    };

    // Facebook SDK 스크립트 추가
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const facebookLoginClick = () => {
    window.FB.login(function(response) {
      if (response.status === 'connected') {
        window.FB.api('/me', 'get', { fields: 'name,email' }, function(r) {
          console.log(r);
        });
      } else if (response.status === 'not_authorized') {
        alert('앱에 로그인해야 이용가능한 기능입니다.');
      } else {
        alert('페이스북에 로그인해야 이용가능한 기능입니다.');
      }
    }, { scope: 'public_profile,email' });
  };

  /////////////////////////////////////////////////////////
  // 구글 아이디로 로그인
  const googleRef = useRef();

  function googleLogin() {
    google.accounts.id.initialize({
      client_id:
        '700528213318-tqvjq8qpbmq30287v72p3ef2kvqe189r.apps.googleusercontent.com',
      callback: handleCallback,
    });
    google.accounts.id.renderButton(googleRef.current, {
      type: "standard",
      theme: "outline",
      size: "medium",
      shape: "circle",
      width: 300,
    });
  }

  function handleCallback(response) {
    console.log(`result: ${response} - ID TOKEN`);
  }
  /////////////////////////////////////////////////////////

  return (
    <html lang="ko">
      <head>
        <title> 로그인 </title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <style>
        {`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: Raleway, sans-serif;
        }
        
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #ffd9c6;
        }
        
        .screen {
          background: #ffffff;
          position: relative;
          width: 360px;
          height: 600px;
          border-radius: 5px;
          box-shadow: 0px 0px 24px #ffaebd;
        }
        
        .screen_content {
          z-index: 1;
          position: relative;
          height: 100%;
        }
        
        .flavor_logo {
          background-color: #ffffff;
          border: none;
          cursor: pointer;
          margin-top: 30px;
          margin-left: 26px;
        }

        // .flavor_content {
        //   transform: translateY(-30%);
        //   color: #303030;
        // }
        
        .screen_background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          -webkit-clip-path: inset(0 0 0 0);
          clip-path: inset(0 0 0 0);
        }
        
        .login {
          width: 360px;
          padding: 10px 42px 4px 42px;
        }
        
        .login_part {
          padding: 16px 0px;
          position: relative;
        }
        
        .login_input {
          border: none;
          border-bottom: 2px solid #D1D1D4;
          background: none;
          padding: 11px 11px 10px 15px;
          font-weight: 700;
          width: 100%;
          text-align: left;
        }
        
        .login_input:active,
        .login_input:focus,
        .login_input:hover {
          outline: none;
          border-bottom-color: #f9958c;
        }
        
        .keep_check {
          position: relative;
          padding-left: 10px;
          display: flex;
          align-items: center;
        }
        
        .input_keep {
          position: relative;
          width: 17.5px; height: 17.5px;
          margin-left: 10px;
          border-radius: 50%;
          z-index: 2;
          border: 1.8px solid #9d9d9d;
          cursor: pointer;
          appearance: none;
          transform: translateY(3px);
        }

        .input_keep::before {
          position: relative;
          top: -3.2px; left: 3.2px;
          content: 'v';
          font-size: 16px;
          color: #9d9d9d;
        }
        
        .input_keep:checked::before {
          position: relative;
          color: #ffffff;
        }
        
        .input_keep:checked {
          position: relative;
          width: 17.5px; height: 17.5px;
          border-radius: 50%;
          border: 1.8px solid #ff96aa;
          background-color: #ff96aa;
          transition: 0.1s;
          z-index: 2;
        }
        
        /* 로그인 상태 유지 */
        .keep_text {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          line-height:17px;
          color: #777777;
          position: relative;
          padding-left: 5px;
          z-index: 1;
          cursor: pointer;
        }
        
        .login_submit {
          background: #ffffff;
          font-size: 14px;
          margin-top: 30px;
          padding: 16px 0px 16px 116px ;
          border-radius: 26px;
          border: 1px solid #D4D3E8;
          text-transform: uppercase;
          font-weight: 700;
          display: flex;
          align-items: center;
          width: 100%;
          box-shadow: 0px 2px 2px #ff715b;
          cursor: pointer;
          transition: .2s;
        }
        
        .btn_login_submit {
          text-align: center;
        }
        
        .login_submit:active,
        .login_submit:focus,
        .login_submit:hover {
          border-color: #ff715b;
          outline: none;
        }
        
        .find_info {
          display: inline-flex;
          list-style-type: none;
          font-size: 10px;
          padding-left: 84px;
        }
        
        .find_idpw {
          margin-left: 13.9px;
          margin-right: 10px;
          color: #868686;
        }
        
        .sign_up {
          color: #868686;
        }
        
        .social_login {
          position: absolute;
          padding: 20px 0px 0px 40px;
        }
        
        .social_icons {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 20px;
        }
        
        .naver_icon, .kakao_icon, .google_icon {
          margin-right: 15px;
          background-color: #ffffff;
          border-color: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: none;
        }
        
        .facebook_icon {
          margin-right: 9.5px;
          background-color: #ffffff;
          border-color: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: none;
        }
        
        
        .naver_icon:active,
        .naver_icon:focus,
        .kakao_icon:active,
        .kakao_icon:focus,
        .facebook_icon:active,
        .facebook_icon:focus,
        .google_icon:active,
        .google_icon:focus {
          border: none;
          box-shadow: none;
        }
        
        .error_message {
          display: none;
          color: red;
          margin-top: -16px;
          margin-left: 5px;
          font-size: 12px;
        }
        `}
        </style>
      </head>
      <body>
        <div className="container">
          <div className="screen">
            <div className="screen_content">
              <Link to="/">
                <button type="flavor_logo" className="flavor_logo">
                  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
                </button>
              </Link>
              {/*  로그인 창 (아이디, 비밀번호, 로그인 유지 체크박스, 로그인 버튼)  */}
              <form className="login">
                <div className="login_part">
                  <input type="id" id="user_id" className="login_input" placeholder="아이디" 
                    value={id} onChange={
                      event => { setId(event.target.value); }
                    } />
                </div>
                <span className="error_message" id="user_id_error"></span>
                
                {/* 비밀번호 */}
                <div className="login_part">
                  <input type="password" id="user_pw" className="login_input" placeholder="비밀번호" 
                    onKeyDown={(event) => checkCapsLock(event, 'caps_lock_warning')} onBlur={() => (document.getElementById('caps_lock_warning').style.display = 'none')}
                    value={password} onChange={
                      event => { setPassword(event.target.value); }
                    }/>
                </div>
                <span className="error_message" id="user_pw_error"></span>
                <span className="error_message" id="caps_lock_warning"></span>
                
                {/* 체크박스 (클릭 시 로그인 상태 유지) */}
                <label htmlFor="keep_check">
                  <input type="checkbox" id="keep" className="input_keep" checked={keepLogin} 
                    onChange={(e) => setKeepLogin(e.target.checked)} />
                  <label for="keep" className="keep_text"> 로그인 상태 유지 </label>
                </label>
                <button id="login_button" className="btn login_submit" onClick={loginUser} >
                  <span className="login_btn"> 로그인 </span>
                </button>
              </form>
              {/* 로그인 창 (아이디, 비밀번호, 로그인 유지 체크박스, 로그인 버튼) 끝 */}

              {/* 아이디 & 비밀번호 찾기, 회원가입 글씨 버튼 */}
              <div className="find_info">
                <Link to="/findidpw" className="find_idpw"> 아이디 | 비밀번호 찾기 </Link>
                <Link to="/signup" className="sign_up" onClick={() => {
                  navigate('/signup');
                  }}> 회원가입 </Link>

              </div>
              {/* 아이디 & 비밀번호 찾기, 회원가입 글씨 버튼 끝 */}

              {/* 간편 로그인 */}
              <div className="social_login">
                <h5> 간편 로그인 </h5>
                <div className="social_icons">
                  {/* 네이버 로그인 버튼 */}
                  <button type="button" className="naver_icon" id="naver_icon" onClick={naverLoginClick}>
                    <img src="https://clova-phinf.pstatic.net/MjAxODAzMjlfOTIg/MDAxNTIyMjg3MzM3OTAy.WkiZikYhauL1hnpLWmCUBJvKjr6xnkmzP99rZPFXVwgg.mNH66A47eL0Mf8G34mPlwBFKP0nZBf2ZJn5D4Rvs8Vwg.PNG/image.png"  width="60" height="60" alt="naver_logo"/>
                  </button>

                  {/* 카카오 로그인 버튼 */}
                  <button type="button" className="kakao_icon" id="kakao_icon" onClick={kakaoLogin}>
                    <img src="https://cdn.icon-icons.com/icons2/2429/PNG/512/kakaotalk_logo_icon_147272.png" width="61" height="61" alt="kakao_logo" />
                  </button>

                  {/* 페이스북 로그인 버튼 */}
                  <button type="button" className="facebook_icon" id="facebook_icon" onClick={facebookLoginClick}>
                    <img src="https://blog.kakaocdn.net/dn/UGS0q/btree5Viurw/l07AH1VgWJHm4stsAHLdL0/img.png" width="59.5" height="59.5" alt="facebook_logo"/>
                  </button>

                  {/* 구글 로그인 버튼 */}
                  <div ref={googleRef} id="googleLoginBtn">
                  <button type="button" className="google_icon" id="google_icon" onClick={googleLogin}>
                    <img src="https://cdn1.iconfinder.com/data/icons/google-new-logos-1/32/google_chrome_new_logo-512.png" width="71.6" height="71.6" alt="google_logo" />
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flavor_content">
          <div className="flavor_position">(주)FLAVOR</div>
          <div className="flavor_email">이메일 문의: cdflavor1113@naver.com</div>
          <div className="flavor_phone">전화 문의: 010-1113-1114</div>
          <div className="flavor_copyright">Copyright Ⓒ 2023 Flavor</div>
        </div> */}
      </body>
    </html>
  );
}

export default LoginPage;