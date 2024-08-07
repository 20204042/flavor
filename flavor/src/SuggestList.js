import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SuggestList({ handleSuggestClick }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:3001/suggestlist');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('게시물 데이터 불러오기 오류:', response.statusText);
        }
      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    }

    fetchPosts();
  }, []);

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const indexOfFirstPost = (currentPage - 1) * postsPerPage;
  const indexOfLastPost = indexOfFirstPost + postsPerPage;
  const sortedPosts = [...posts].reverse();
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageButtons = [];
  for (let page = 1; page <= totalPages; page++) {
    pageButtons.push(
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        disabled={page === currentPage}
        className={`page_button ${page === currentPage ? 'clicked' : ''}`}
      >
        {page}
      </button>
    );
  }

  return (
    <div>
      <style>
        {`
        .board_container {
          text-align: center;
          padding: 20px;
          border-radius: 5px;
          margin-top: -20px;
        }

        .flavor_logo {
          top: 20px;
          display: block;
          margin: 0 auto;
          margin-bottom: 30px;
        }

        h1 {
          margin-bottom: 10px;
        }
        
        .post_list {
          width: 80%;
          margin: 0 auto;
          text-align: center;
          border-collapse: collapse;
          border: 1px solid #ccc;
          background-color: #fff;
        }
        
        .post_list_header {
          background-color: #333;
          color: #fff;
          padding-bottom: px;
        }
        
        .post_list_header th {
          padding: 10px;
        }
        
        .post_list_item {
          border-bottom: 1px solid #ccc;
        }
        
        .post_list_item td {
          padding: 10px;
        }
        
        .page_navigation {
          text-align: center;
          position: fixed;
          top: 640px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .page_button {
          background: none;
          color: #000;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          margin: 0 5px;
          cursor: pointer;
          text-decoration: none;
          outline: none;
          min-width: 40px;
          height: 30px;
        }
        
        .page_button.clicked {
          border: 2px solid #FF6480;
        }

        .page_button:hover {
          border: 2px solid #c24e63;
        }
        
        .first_button,
        .last_button {
          background-color: #FF6480;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          margin: 0 5px;
          cursor: pointer;
        }

        .first_button,
        .last_button:hover {
          // background-color: #c24e63;
        }
        
        .add_button {
          background-color: #FF6480;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          min-width: 40px;
          line-height: 180x;
          height: 35px;
          cursor: pointer;
          margin-top: 20px;
        }

        .add_button:hover {
          background-color: #c24e63;
        }

        .separator {
          width: 972%;
          height: 1px; /* 원하는 높이로 조절하세요 */
          background-color: #ccc; /* 구분선의 색상을 조절하세요 */
          // margin: 0 10px; /* 구분선과 버튼 사이의 간격을 조절하세요 */
        }
        `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      <div className="board_container">
        <h1>건의 게시판</h1>
        <table className="post_list">
        {/* <li className="post_list_header"> */}
          <thead>
            <tr>
              <th className="post_number">순서</th>
              <th className="post_title">제목</th>
              <th className="post_date">작성일</th>
              <th className="post_views">조회수</th>
            </tr>
          </thead>
          <div className="separator"></div>
          {/* </li> */}
          <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id} className="post_list_item">
            <td className="post_number">{totalPosts - indexOfFirstPost - index}</td>
            <td className="post_title">
              <Link to={`/suggestlist/post/${post.id}`} onClick={() => handleSuggestClick(post.id)}>
                {post.title}
              </Link>
              </td>
              <td className="post_date_trans">{new Date(post.date).toLocaleDateString()}</td>
              <td className="post_views">{post.views}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="page_navigation">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="first_button">&lt;&lt;</button>
          {/* <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="pre_button">이전</button> */}
          {pageButtons}
          {/* <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || totalPosts === 0} className="next_button">다음</button> */}
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || totalPosts === 0} className="last_button">&gt;&gt;</button>
          <br />
          <button onClick={() => navigate('/suggestlist/createpostforms')} className="add_button">게시글 작성</button>
        </div>
      </div>
    </div>
  );
}

export default SuggestList;