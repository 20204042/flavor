import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [startYear] = useState(1950);
  const [endYear] = useState(new Date().getFullYear());
  const [userName, setUserName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [userNumber, setUserNumber] = useState("");

  //////////////////// 아이디 경고 (영문, 소문자) ////////////////////
  const handleIdInputChange = (event) => {
    const input = event.target.value;
    const regex = /^[a-z0-9]+$/;
    const errorMessage = document.getElementById('su_id_error');

    if (!regex.test(input)) {
      event.target.value = input.replace(/[^a-z0-9]/g, '');
      errorMessage.innerText = '영문 소문자와 숫자만 입력할 수 있습니다.';
      errorMessage.style.color = 'red';
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
    }

    setId(event.target.value);
  };

  //////////////////// 비밀번호 경고 (CAPSLOCK) ////////////////////
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

  //////////////////// 생년월일 YYMMDD로 DB 입력 ////////////////////
  const handleBirthYearChange = (event) => {
    setBirthYear(event.target.value);
  };

  const handleBirthMonthChange = (event) => {
    setBirthMonth(event.target.value);
  };

  const handleBirthDayChange = (event) => {
    setBirthDay(event.target.value);
  };

  const combineBirthdate = () => {
    if (birthYear && birthMonth && birthDay) {
      const year = birthYear.toString().slice(-2);
      const month = `0${birthMonth}`.slice(-2);
      const day = `0${birthDay}`.slice(-2);
      return year + month + day;
    } else {
      return "";
    }
  };

  //////////////////// 이메일 관련 (형식, 경고) ////////////////////
  const handleEmailInputChange = (event) => {
    const input = event.target.value;
    const regex = /^[a-zA-Z0-9!@#$%^&*()\-=+_~`{[\]|:;"'<>,.?/]*$/; // 영문, 숫자, 특수 기호를 제외한 문자 입력 방지 정규식
    const errorMessage = document.getElementById('su_email_error');

    if (!regex.test(input)) {
      event.target.value = input.replace(/[^a-zA-Z0-9!@#$%^&*()\-=+_~`{[\]|:;"'<>,.?/]/g, '');
      errorMessage.innerText = '영문, 숫자, 특수 기호만 입력할 수 있습니다.';
      errorMessage.style.color = 'red';
      errorMessage.style.display = 'block';
    } else {
      errorMessage.style.display = 'none';
    }

    setUserEmail(event.target.value);
    const userInput = event.target.value;
    console.log('사용자 입력: ', userInput);
  };

  const handleEmailDomainChange = (event) => {
    setEmailDomain(event.target.value);
  };

  const combineEmail = () => {
    const email = userEmail;
    const domain = emailDomain;
    return email + "@" + domain;
  };

  //////////////////// 전화번호 관련 (형식) ////////////////////
  const handleNumberInputChange = (event) => {
    const phoneNumber = event.target.value;
    const formattedNumber = formatPhoneNumber(phoneNumber);
    document.getElementById('user_number').value = formattedNumber;

    setUserNumber(formattedNumber);
    const userInput = formattedNumber;
    console.log('사용자 입력 전화번호: ', userInput);
  };

  const formatPhoneNumber = (phoneNumber) => {
    phoneNumber = phoneNumber.replace(/[^0-9]/g, ''); // 입력된 문자열에서 숫자 이외의 문자 제거
    let formattedNumber = '';
    if (phoneNumber.length < 4) {
      formattedNumber = phoneNumber;
    } else if (phoneNumber.length < 7) {
      formattedNumber = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3);
    } else if (phoneNumber.length < 11) {
      formattedNumber = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6);
    } else {
      formattedNumber = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7, 4);
    }
    return formattedNumber;
  };

  const signUpUser = async (event) => {
    event.preventDefault();
    if (userName && id && password && password2 && birthYear && birthMonth && birthDay && userEmail && emailDomain && userNumber) {
      if (password === password2) {
        const birthdate = await combineBirthdate();
        const email = await combineEmail();

        const userData = {
          name: userName,
          userid: id,
          userPassword1: password,
          userPassword2: password2,
          birthdate: birthdate,
          email: email,
          number: userNumber,
        };
  
        try {
          const response = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
  
          const responseData = await response.json();
  
          if (responseData.isSuccess === true) {
            alert('회원가입이 완료되었습니다!');
          } else {
            alert('회원가입 실패: ' + responseData.message);
          }
        } catch (error) {
          console.error('회원가입 오류:', error);
          alert('회원가입 중 오류가 발생했습니다.');
        }
      } else {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      }
    } else {
      alert('모든 필수 정보를 입력하세요.');
    }
  };

  const handleCancel = () => {
    window.confirm('정말 취소하시겠습니까?');
  };

  return (
    <div>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: sans-serif;
          }
          
          body {
            font-family: Arial, sans-serif;
            background-color: #ffd9c6;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          
          .member {
            font-size: 14px;
            height: 750px;
            width: 400px;
            padding: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            border: none;
            box-shadow: 0px 0px 24px #ffaebd;
          }
          
          b {
            display: block;
            left: 10px;
          }
          
          .field_name,
          .field_id,
          .field_password,
          .field_password_check,
          .field_birth,
          .field_email,
          .field_number {
            margin-top: 5px;
            margin-bottom: 15px;
          }
          
          .field_id {
            position: relative;
          }
          
          .field_id button {
            position: absolute;
            top: 2px;
            right: 3px;
            bottom: 2px;
            padding: 6px 8px;
            background-color: #ffa99a;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          
          .field_id button:hover {
            background-color: #e5988a;
          }
          
          .error_message {
            display: none;
            color: red;
            margin-top: -14.2px;
            margin-left: 5px;
            font-size: 10.7px;
          }
          
          .field_birth {
            display: flex;
            align-items: center;
          }
          
          .field_birth select {
            width: 107px;
          }
          
          .field_birth .error_message {
            display: none;
            position: absolute;
            margin-top: 58px;
            margin-left: 5px;
          }
          
          .field_email {
            display: flex;
            align-items: center;
          }
          
          #user_email,
          .field_email_domain_option {
            width: 95px;
            font-size: 14px;
            padding-bottom: 4px;
          }

          #user_email {
            top: 4px;
            font-weight: 700;
          }

          .field_email_domain_txt {
            top: 5px;
          }
          
          .field_email_domain_option {
            width: 116px;
          }
          
          .buttons {
            left: 28%;
            top: 20px;
          }

          #signup_button {
            left: -44px;
            padding: 12px 24px 12px 24px;
          }

          #signup_cancel_button {
            padding: 12px 24px 12px 24px;
          }
          
          .field_name input,
          .field_id input,
          .field_password input,
          .field_password_check input,
          .field_email input,
          .field_number input,
          .field_email_domain_txt,
          .field_email_domain_option {
            width: 95%;
            border: none;
            border-bottom: 2px solid #ccc;
            transition: border-bottom-color 0.2s;
          }

          .field_name input,
          .field_id input,
          .field_password input,
          .field_password_check input,
          .field_email input,
          .field_number input,
          .field_email_domain_txt,
          .field_email_domain_option,
          .field_birth select,
          .field_email select,
          .field_number input {
            border: none;
            border-bottom: 2px solid #ccc;
            color: #7e7e7e;
            transition: border-bottom-color 0.2s;
            padding-left: 10px;
          }

          .field_name input:active,
          .field_id input:active,
          .field_password input:active,
          .field_password_check input:active,
          .field_email input:active,
          .field_number input:active,
          .field_email_domain_txt:active,
          .field_email_domain_option:active,
          .field_birth select:active,
          .field_email select:active,
          .field_number input:active,
          .field_name input:focus,
          .field_id input:focus,
          .field_password input:focus,
          .field_password_check input:focus,
          .field_email input:focus,
          .field_number input:focus,
          .field_email_domain_txt:focus,
          .field_email_domain_option:focus,
          .field_birth select:focus,
          .field_email select:focus,
          .field_number input:focus,
          .field_name input:hover,
          .field_id input:hover,
          .field_password input:hover,
          .field_password_check input:hover,
          .field_email input:hover,
          .field_number input:hover,
          .field_email_domain_txt:hover,
          .field_email_domain_option:hover,
          .field_birth select:hover,
          .field_email select:hover,
          .field_number input:hover {
            outline: none;
            border-bottom-color: #ffa99a;
          }

          .field_birth select,
          .field_email select,
          .field_number input {
            border: none;
            font-weight: 700;
            border-bottom: 2px solid #ccc;/
            transition: border-bottom-color 0.2s;
            padding-left: 10px;
            padding-bottom: 8px;
          }

          .field_birth select:focus,
          .field_email select:focus,
          .field_number input:focus {
            border-bottom-color: #ffa99a;
          }

          .field_birth select:active,
          .field_email select:active,
          .field_number input:active,
          .field_birth select:hover,
          .field_email select:hover,
          .field_number input:hover {
            outline: none;
            border-bottom-color: #f9958c;
          }
          
          .login_input {
            border: none;
            border-bottom: 2px solid #D1D1D4;
            background: none;
            padding: 11px 11px 8px 15px;
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
          
          input[type="submit"] {
            padding: 10px 20px;
            background-color: #ffa99a;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          
          input[type="button"] {
            padding: 10px 20px;
            background-color: #ad9e98;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }
          
          input[type="submit"]:hover {
            background-color: #e5988a;
          }
          
          input[type="button"]:hover {
            background-color: #847874;
          }

          #user_number {
            top: 9px;
          }
        `}
      </style>
      <div className="member">
        <Link to="/">
          <button type="flavor_logo" className="flavor_logo">
            <img
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png"
              width="330" height="115.5" alt="flavor_logo"/>
          </button>
        </Link>
        <b> 이름 * </b>
        <div className="field_name">
          <input type="text" id="user_name" className="login_input" placeholder="이름 입력" value={userName} // userName 상태와 연결
            onChange={(event) => setUserName(event.target.value)} />
        </div>
        <span className="error_message" id="su_name_error"></span>

        <b> 아이디 *</b>
        <div className="field_id">
          <input type="text" id="user_id" className="login_input" placeholder="아이디 입력 (6~20자)" value={id}
            onInput={handleIdInputChange} />
          {/* <button id="idck_btn" onClick={checkDuplicate}> 중복 확인 </button> */}
        </div>
        <span className="error_message" id="su_id_error"></span>

        <b> 비밀번호  *</b>
        <div className="field_password">
          <input
            type="password" id="user_pw" className="login_input" placeholder="비밀번호 입력 (숫자, 특수문자 포함 8~20자)" value={password}
            onKeyDown={(event) => checkCapsLock(event, 'caps_lock_warning1')}
            onBlur={() => (document.getElementById('caps_lock_warning1').style.display = 'none')}
            onChange={(event) => setPassword(event.target.value)} />
        </div>
        <span className="error_message" id="su_pw_error"></span>
        <span className="error_message" id="caps_lock_warning1"></span>

        <b> 비밀번호 확인 * </b>
        <div className="field_password_check">
          <input
            type="password" id="user_pwck" className="login_input" placeholder="비밀번호 재입력" value={password2}
            onKeyDown={(event) => checkCapsLock(event, 'caps_lock_warning2')}
            onBlur={() => (document.getElementById('caps_lock_warning2').style.display = 'none')}
            onChange={(event) => setPassword2(event.target.value)} />
        </div>
        <span className="error_message" id="su_pwck_error"></span>
        <span className="error_message" id="caps_lock_warning2"></span>

        <b> 생년월일 </b>
          <div className="field_birth">
            <div id="field_birth_year" className="login_input_b">
              <select id="birth_year" onChange={handleBirthYearChange}>
                <option disabled selected> 출생년도 </option>
                {Array.from({ length: endYear - startYear + 1 }, (_, index) => (
                  <option key={startYear + index} value={startYear + index}>
                    {startYear + index}년
                  </option>
                ))}
              </select>
            </div>

            <div id="field_birth_month" className="login_input_b">
              <select id="birth_month" onChange={handleBirthMonthChange}>
                <option disabled selected> 월 </option>
                {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}월
                </option>
              ))}
              </select>
            </div>

            <div id="field_birth_day" className="login_input_b">
              <select id="birth_day" onChange={handleBirthDayChange}>
                <option disabled selected> 일 </option>
                {Array.from({ length: 31 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}일
                </option>
              ))}
              </select>
            </div>
            <span className="error_message" id="su_birth_error"></span>
          </div>

        <b> 이메일 * </b>
        <div className="field_email">
        <input type="text" id="user_email" className="login_input_b" placeholder="이메일 주소" 
          value={userEmail} onChange={handleEmailInputChange} /> @
            <input className="field_email_domain_txt" id="email_domain_txt" type="text" disabled value={emailDomain} 
              onChange={(event) => {
                const value = event.target.value;
                setEmailDomain(value);
                handleEmailInputChange(event);
              }} />
          <select className="field_email_domain_option" id="email_domain_option"
            onChange={(event) => handleEmailDomainChange(event)} >
            <option disabled selected> 선택 </option>
            <option> 직접 입력 </option>
            <option value="naver.com"> naver.com </option>
            <option value="google.com"> google.com </option>
            <option value="hanmail.net"> hanmail.net </option>
            <option value="nate.com"> nate.com </option>
            <option value="kakao.com"> kakao.com </option>
            <option value="korea.com"> korea.com </option>
          </select>
        </div>
        <span className="error_message" id="su_email_error"></span>

        <b> 전화번호 </b>
        <div className="field_number">
            <div>
              <input type="text" name="phone" id="user_number" className="login_input_b" placeholder="휴대폰 번호 입력" 
                value={userNumber} onInput={handleNumberInputChange} />
            </div>
          </div>
          <span className="error_message" id="su_number_error"></span>

        <div className="buttons">
          <input type="submit" id="signup_button" value="회원가입" onClick={signUpUser} />
          <Link to="/">
            <input type="button" id="signup_cancel_button" value="뒤로가기" onClick={handleCancel} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;