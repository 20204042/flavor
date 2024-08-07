import React from 'react';
import { Link } from 'react-router-dom';

function SmallMenu({ name, userid }) {
  return (
    <li>
      {name === '프로필' && <Link to="/myinfo">프로필</Link>}
      {/* {name === '프로필' && <Link to={`/myinfo?userid=${userid}`}>프로필</Link>} */}
      {/* {name === '프로필' && <Link to="/myinfo?userid=cdflavor1113">프로필</Link>} */}
      {name === '찜한 목록' && <Link to="/myinfoheart">찜한 목록</Link>}
      {/* {name === '내 글 목록' && <Link to="/">내 글 목록</Link>} */}
      
      {name === '종류별' && <Link to="/mapfoodtype">종류별</Link>}
      {name === '구역별' && <Link to="/mapfoodarea">구역별</Link>}
      {/* {name === '키워드별' && <Link to="/recomkeyword">키워드별</Link>} */}
      {name === '날씨별' && <Link to="/weather">날씨별</Link>}

      {name === '자유 게시판' && <Link to="/boardlist">자유 게시판</Link>}
      {name === '건의 게시판' && <Link to="/suggestlist">건의 게시판</Link>}
      {name === '설문 조사' && <Link to="/vote">설문 조사</Link>}

      {name === '음식 월드컵' && <Link to="/foodworldcup">음식 월드컵</Link>}
      {name === '룰렛' && <Link to="/recomrandom">룰렛</Link>}

      {name === '도움말' && <Link to="/setting">도움말</Link>}
    </li>
  );
}

export default SmallMenu;