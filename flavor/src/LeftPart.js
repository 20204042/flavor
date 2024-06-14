import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import SmallMenu from './SmallMenu';

function LeftPart({ userid }) {
  const [isSubV, setSubV] = useState(false);
  const [isUserV, setUserV] = useState(false);
  const [isSearchV, setSearchV] = useState(false);
  const [isBoardV, setBoardV] = useState(false);
  const [isRankV, setRankV] = useState(false);
  const [isSettingV, setSettingV] = useState(false);

  const listBtnClick = () => {
    setSubV(!isSubV);
  }

  const userMenuClick = () => {
    setUserV(!isUserV);
  };
  
  const searchMenuClick = () => {
    setSearchV(!isSearchV);
  };
  
  const boardMenuClick = () => {
    setBoardV(!isBoardV);
  };

  const rankMenuClick = () => {
    setRankV(!isRankV);
  };

  const settingMenuClick = () => {
    setSettingV(!isSettingV);
  };
    
  return (
    <div className="left_part" style={{ position: 'absolute', top: 0 }}>
      <div className="left_side_menu">
        <div className="sidebar">
          <a href="javascript:void(0);" className="waves-effect">
            <button type="sidebar_info_left" className="list_btn" onClick={listBtnClick}>
              <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fmhy5u%2Fbtshz0pWsKA%2F5ldl8mMklDrlnNEQdKBKBk%2Fimg.png" width="38" height="38" alt="list" />
            </button>
          </a>
          <button type="sidebar_info_left" className="side_user">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBBqgT%2FbtshCgk8Iud%2FgPM9jKKbs3miEzQpzrOAK1%2Fimg.png" width="38" height="38" alt="user" />
          </button>
          <button type="sidebar_info_left" className="side_search">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkFoMC%2FbtshAqoLA2f%2FLQ3iZLKAgRvbFUmQ9bzTrk%2Fimg.png" width="38" height="38" alt="search"/>
          </button>
          <button type="sidebar_info_left" className="side_board">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb1dZ9c%2FbtshA0wcGtI%2FwtE7koc7WRiCLQvSUEoAc0%2Fimg.png" width="38" height="38" alt="board" />
          </button>
          <button type="sidebar_info_left" className="side_rank">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdbUFey%2FbtshRydJ8j3%2FSXxTA9Utn0WubN1dZTE1F0%2Fimg.png" width="38" height="38" alt="rank" />
          </button>
          <Link to="/test">
          <button type="sidebar_info_left" className="side_setting">
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbeNYyT%2FbtshBkHYbMM%2FxemSvtsBkVr8aZJYgp7xg1%2Fimg.png" width="38" height="38" alt="setting" />
          </button>
          </Link>
        </div>
      </div>
      {/* 왼쪽 서브 메뉴 */}
      <div className={`left_sub_menu ${isSubV ? 'visible' : 'hidden'}`}>
        <div className="sub_menu">
          <h2>FLAVOR</h2>
          <ul className="big_menu" onClick={userMenuClick}>
            <li>
              <button type="sidebar_info_right" className="bar_user">
                <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcfAkVr%2FbtshKRx4lhW%2FNMhl5ydIsx24ftvl7uBSMk%2Fimg.png" width="38" height="38" style={{ marginRight: 20 }} alt="list" />
              </button> 내 정보 <i className="cate"></i>
            </li>
            <ul className={`small_menu_user ${isUserV ? 'visible' : 'hidden'}`}>
              <SmallMenu name="프로필" userid={userid}>
              <Link to="/myinfo"></Link>
                {/* <Link to={`/myinfo?userid=${userid}`}></Link> */}
                {/* <Link to="/myinfo?userid=cdflavor1113"></Link> */}
              </SmallMenu>
              <SmallMenu name="찜한 목록"/>
              {/* <SmallMenu name="내 글 목록"/> */}
            </ul>
          </ul>
          <ul className="big_menu" onClick={searchMenuClick}>
            <li>
              <button type="sidebar_info_right" className="bar_search">
                <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbGiypo%2FbtshAqPR6aW%2FPN5baU1J4EvJYFzok8dTnk%2Fimg.png" width="38" height="38" style={{ marginRight: 20 }} alt="search" />
              </button> 검색 <i className="cate"></i>
            </li>
            <ul className={`small_menu_search ${isSearchV ? 'visible' : 'hidden'}`}>
              <SmallMenu name="구역별"/>
              <SmallMenu name="종류별"/>
              {/* <SmallMenu name="키워드별"/> */}
              <SmallMenu name="날씨별"/>
            </ul>
          </ul>
          <ul className="big_menu" onClick={boardMenuClick}>
            <li>
              <button type="sidebar_info_right" className="bar_board">
                <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc3nCju%2FbtshHNbvewZ%2FLONYxTbMeXtE576hqU3nr0%2Fimg.png" width="38" height="38" style={{ marginRight: 20 }} alt="board" />
              </button> 게시판 <i className="cate"></i>
            </li>
            <ul className={`small_menu_board ${isBoardV ? 'visible' : 'hidden'}`}>
              <SmallMenu name="자유 게시판"/>
              <SmallMenu name="건의 게시판"/>
              <SmallMenu name="설문 조사"/>
            </ul>
          </ul>
          <ul className="big_menu" onClick={rankMenuClick}>
            <li>
              <button type="sidebar_info_right" className="bar_rank">
                <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FEuYYV%2FbtshAZYn8Tn%2FL066fB7lLPlrm6X9krFiI1%2Fimg.png" width="38" height="38" style={{ marginRight: 20 }} alt="rank" />
              </button> 게임 <i className="cate"></i>
            </li>
            <ul className={`small_menu_rank ${isRankV ? 'visible' : 'hidden'}`}>
              <SmallMenu name="음식 월드컵"/>
              <SmallMenu name="룰렛"/>
            </ul>
          </ul>
          <ul className="big_menu" onClick={settingMenuClick}>
            <li>
              <button type="sidebar_info_right" className="bar_setting">
                <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FUaRhy%2FbtshAz6Tj9C%2F43Se536UK55i2GS0QP5NLk%2Fimg.png" width="38" height="38" style={{ marginRight: 20 }} alt="setting" />
              </button> 설정 <i className="cate"></i>
            </li>
            <ul className={`small_menu_setting ${isSettingV ? 'visible' : 'hidden'}`}>
              <SmallMenu name="도움말"/>
            </ul>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LeftPart;