import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LeftPart from './LeftPart';

// MainPage는 크게 세 부분으로 나뉨
// LeftPart는 Left.js에 있으며, 왼쪽 사이드 바를 의미함
// MiddlePart는 여기 App.js에 있으며, Flavor 로고와 검색 창(기록까지)을 묶어놓은 것을 의미함
// RightPart도 여기 App.js에 있으며, 로그인 & 회원가입 버튼과 스위치 버튼을 함께 묶어놓은 것을 의미함

function MainPage() {
  const [isSwitchChecked, setSwitchChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigate = useNavigate();

  const handleSwitchToggle = () => {
    setSwitchChecked(!isSwitchChecked);
    if (!isSwitchChecked) {
      setShowPopup(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const popupAgreeClick = () => {
    setShowPopup(false);
    setSwitchChecked(true);
  };

  const popupDisagreeClick = () => {
    setShowPopup(false);
    setSwitchChecked(false);
  };

  const setRandomFood = () => {
    var foods = ["초밥", "돈까스", "냉모밀", "마라탕", "삼계탕", "치킨", "피자", "짜장면", "짬뽕", "탕수육", "떡볶이", "김치찌개", "부대찌개", "순두부찌개", "삼겹살",
    "쫄면", "덮밥", "국수", "냉면", "곱창", "닭발", "족발", "보쌈", "스파게티", "스파게티", "찜닭", "갈비", "국밥", "제육볶음", "오징어볶음", "라면", "햄버거", "샌드위치",
    "샐러드", "카레", "비빔밥", "김밥"];
    var randomIndex = Math.floor(Math.random()*foods.length);
    var inputField = document.getElementById("randomFood");
    inputField.setAttribute("placeholder", "오늘의 추천 메뉴는 " + foods[randomIndex] + "입니다!");
  };

  const handleSearchButtonClick = () => {
    navigate('/mapfoodtype');
  };

  const handleSearchEnterPress = (event) => {
    if (event.key === 'Enter') {
      navigate('/mapfoodtype');
    }
  };

  return (
    <div>
      <style>
        {`
        .no_recent_search {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          font-size: 20px;
          color: gray;
        }

        .main_keyword_button:hover {
          background-color: #c24e63;
        }
        `}
      </style>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <title> 메인 화면 </title>
        <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body onLoad={setRandomFood}>
        <LeftPart/>
        {/* 메인 페이지의 로고, 검색 창 부분 */}
        <div className="middle_part">
          {/* 로고 */}
          <button type="flavor_logo" className="flavor_logo">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="415" height="140" alt="flavor_logo" />
          </button>
          {/* 검색 부분 묶음 */}
          <div className="search_part">
            {/* 검색창 */}
            <div className="search" id="search">
              <input type="text" className="search_box" id="randomFood" onKeyPress={handleSearchEnterPress} />
              <button type="button" className="search_icon" onClick={handleSearchButtonClick} >
                <img src="https://cdn.icon-icons.com/icons2/1302/PNG/512/magnifyingglassbrowser_85768.png" className="srh_btn" width="24px" height="24px" alt="search_icon" />
              </button>
            </div>
          </div>
          <div className="search_list">
            <div className="suggested_search" id="suggested_search"></div>
          </div>
        </div>
        {/* 메인 페이지의 스위치, 로그인, 회원가입 부분 */}
        <div className="right_part">
          {/* 스위치 */}
          <div className="switch">
            <input type="checkbox" id="sw_btn" checked={isSwitchChecked} onClick={handleSwitchToggle} />
            <label htmlFor="sw_btn" className="switch_label">
              <span className="onf_btn"></span>
            </label>
          </div>
          <ul className="login_and_register">
            <li><Link to="/login" className="lar">로그인</Link></li>
            <li><Link to="/signup" className="lar">회원가입</Link></li>
          </ul>
        </div>
        {/* 위치 수신 동의 팝업창 */}
        {showPopup && (
          <div className="popup_box" id="popup_box">
            {/* 팝업창 내용 */}
            <div className="popup_content">
              <div className="popup_text">'Flavor'이 사용자의 위치에 접근하도록 허용하시겠습니까?</div>
              <div className="mini_map" id="mini_map">
                <img src="https://cdn.discordapp.com/attachments/1094967239830151221/1172956980390936689/image.png?ex=65623450&is=654fbf50&hm=2b67499958033836d4981f754ddcc53b4d10608fed15d0a991c584f2da83ef99&"
                  width="140" height="140" alt="map" />
              </div>
              <div className="popup_actions">
                <button className="popup_agree" onClick={popupAgreeClick}>허용</button>
                <button className="popup_disagree" onClick={popupDisagreeClick}>비허용</button>
              </div>
            </div>
          </div>
        )}
      </body>
      <div className="flavor_content">
        <div className="flavor_position">(주)FLAVOR</div>
        <div className="flavor_email">이메일 문의: cdflavor1113@naver.com</div>
        <div className="flavor_phone">전화 문의: 010-1113-1114</div>
        <div className="flavor_copyright">Copyright Ⓒ 2023 Flavor</div>
      </div>
    </div>
  );
}

export default MainPage;