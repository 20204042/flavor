import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreatePostForm() {
  const [newPost1, setNewPost] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    try {
      if (!newPost1.title || !newPost1.content) {
        setError('제목과 내용을 모두 입력해주세요.');
        return;
      }

      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const contentWithBr = newPost1.content.replace(/\n/g, '<br>');

      const postData = {
        title: newPost1.title,
        content: newPost1.content,
        date: currentDate,
        views: 0,
      };

      const response = await fetch('http://localhost:3001/boardlist/createpostform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('오류1: ' + response.statusText);
      }
      
      // DB 저장이 성공한 경우에만 페이지 이동
      setNewPost({ title: '', content: '' });
      navigate('/boardlist');
    } catch (error) {
      console.error('API 요청 오류:', error);
      alert('오류2: ' + error.message);
    }
  }

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

        .write h2 {
          font-size: 24px;
          margin-top: 30px;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .write input {
          width: 80%;
          padding: 10px;
          margin: 20px auto;
          display: block;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }

        .write textarea {
          width: 80%;
          height: 400px;
          padding: 10px;
          margin: 10px auto;
          display: block;
          border: 1px solid #ccc;
          border-radius: 5px;
          resize: none;
          font-size: 14px;
        }
        
        .write button {
          top: 20px;
          background-color: #ff6480;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          transition: background-color 0.3s;
          display: block;
          margin: 0 auto;
        }
        
        .write button:hover {
          background-color: #c24e63;
        }
        
        .error_message {
          color: red;
          margin-top: 10px;
          }
        `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      <div className="write">
        <h2>게시물 작성</h2>
        <input
          type="text"
          placeholder="제목"
          value={newPost1.title}
          onChange={(e) => setNewPost({ ...newPost1, title: e.target.value })}
        />
        <textarea
          placeholder="내용"
          value={newPost1.content}
          onChange={(e) => setNewPost({ ...newPost1, content: e.target.value })}
          rows="10"
        />
        <button onClick={handleCreatePost}>작성 완료</button>
        {error && <p className="error_message">{error}</p>}
      </div>
    </div>
  );
}

export default CreatePostForm;
