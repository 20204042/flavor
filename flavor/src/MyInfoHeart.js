import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyInfoHeart = () => {
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/myinfoheart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // 빈 요청
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 오류');
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setRestaurantInfo(data);
        }
      })
      .catch((error) => {
        setError('데이터를 가져오는 중 오류가 발생했습니다');
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <style>
        {`
        .flavor_logo {
          left: -5px;
          display: block;
          margin: 30px auto 0;
        }

        h2 {
          font-size: 24px;
          text-align: center;
        }

        .restaurant_item {
          top: 10px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f7f7f7;
          max-width: 400px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        
        .restaurant_list {
          list-style: none;
          padding: 0;
        }
      
        .restaurant_item h2 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }
        
        .total_favorites {
          margin-top: 20px;
          font-weight: bold;
        }
        `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      {restaurantInfo.length > 0 ? (
        <div>
          <h2>나의 찜 목록</h2>
          <ul className="restaurant_list">
            {restaurantInfo.map((restaurant, index) => (
              <li className="restaurant_item" key={index}>
                <h2>{restaurant.title}</h2>
                <p>전화번호: {restaurant.phone_number}</p>
                <p>메뉴: {restaurant.menu}</p>
                <p>종류: {restaurant.type}</p>
                <p>주소: {restaurant.address}</p>
              </li>
            ))}
          </ul>
          {/* <p className="total_favorites">총 찜한 횟수: {restaurantInfo.length}</p> */}
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>찜 목록이 없습니다.</p>
      )}
    </div>
  );
};

export default MyInfoHeart;
