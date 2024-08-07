import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [prevPost, setPrevPost] = useState({});
  const [nextPost, setNextPost] = useState({});
  const [totalPosts, setTotalPosts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3001/boardlist/post/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error('게시글 데이터 불러오기 오류:', response.statusText);
        }
      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    }

    fetchPost();
  }, [id]);

  useEffect(() => {
    async function fetchPostInfo() {
      try {
        const response = await fetch(`http://localhost:3001/boardlist/postinfo/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPrevPost(data[0]);
          setNextPost(data[2]);
        } else {
          console.error('게시물 정보 가져오기 오류:', response.statusText);
        }
      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    }

    fetchPostInfo();
  }, [id]);

  // async function fetchTotalPosts() {
  //   try {
  //     const response = await fetch('http://localhost:3001/totalPosts');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setTotalPosts(data.totalPosts);
  //     } else {
  //       console.error('게시물 총 개수 가져오기 오류:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('API 요청 오류:', error);
  //   }
  // }
  
  // useEffect(() => {
  //   fetchTotalPosts();
  // }, [id]);

  const handleIncreaseViews = async (postId) => {
    try {
      // 서버에 게시글의 조회수를 업데이트하는 API 요청을 보냅니다.
      const response = await fetch(`http://localhost:3001/boardlist/increaseviews/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setPost((prevPost) => ({
          ...prevPost,
          views: prevPost.views + 1,
        }));
      } else {
        console.error('조회수 업데이트 오류:', response.statusText);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  // const isFirstPage = parseInt(post.id, 10) === 1;
  // const isLastPage = parseInt(post.id, 10) >= totalPosts;

  return (
    <div>
      <style>
      {`
      .flavor_logo {
        top: 20px;
        display: block;
        margin: 0 auto;
        margin-bottom: 10px;
      }

      .list_button {
        background-color: #ff6480;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px 0px 0px 2%; // 상 우 하 좌
      }

      .list_button:hover {
        background-color: #c24e63;
      }

      .post_detail {
        text-align: center;
        margin-top: 20px;
        justify-content: space-between;
      }

      .post_title {
        font-size: 24px;
        margin: 10px auto;
        width: 70%;
        font-weight: bold;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px;
        margin-bottom: 10px;
      }

      .post_info {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 0px 15%;
      }

      .post_date {
        font-size: 14px;
        width: 230px;
      }

      .post_views {
        font-size: 14px;
        width: 70px;
      }

      .post_content {
        width: 70%;
        height: 400px;
        margin: 10px auto;
        border-radius: 5px;
        font-size: 16px;
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }

      .button_container {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }

      .navigation_button {
        background-color: #ff6480;
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
        margin: 20px 10% 0px 10%; // 상 우 하 좌
      }

      .navigation_button:hover {
        background-color: #c24e63;
      }
      `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      <button className="list_button" onClick={() => navigate('/boardlist')}>목록으로</button>
      <div className="post_detail">
        <div className="post_title">{post.title}</div>
        <div className="post_info">
          <div className="post_date">작성일자: {new Date(post.date).toLocaleString()}</div>
          <div className="post_views">조회: {post.views}
        </div>
        </div>
        <div className="post_content"><pre>{post.content}</pre></div>
        <div className="button_container">
          <button
          className="navigation_button"
            onClick={() => {
              // if (!isFirstPage) {
                navigate(`/boardlist/post/${parseInt(post.id, 10) - 1}`);
                // handleIncreaseViews(prevPost.id);
              // }
            }}
            // disabled={isFirstPage}
          >
            이전 게시물
          </button>
          <button
            className="navigation_button"
            onClick={() => {
              // if (!isLastPage) {
                navigate(`/boardlist/post/${parseInt(post.id, 10) + 1}`);
                // handleIncreaseViews(nextPost.id);
              // }
            }}
            // disabled={isLastPage}
          >
            다음 게시물
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;