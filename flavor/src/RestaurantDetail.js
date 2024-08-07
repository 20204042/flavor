import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const RestaurantDetail = ({ selectedRestaurant }) => {
  const { id } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [rating, setRating] = useState(() => {
    // 페이지가 처음 로드될 때 localStorage에서 저장된 별점 값을 불러옵니다.
    const savedRating = localStorage.getItem(`rating_${id}`);
    return savedRating ? parseInt(savedRating, 10) : 0;
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [moods, setMoods] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMoods() {
      try {
        const response = await fetch(`http://localhost:3001/getMoods/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMoods(data);
          console.log(data);
        } else {
          const errorData = await response.json();
          console.error('분위기 데이터 불러오기 오류:', errorData.error);
        }
      } catch (error) {
        console.error('API 요청 오류:', error);
      }
    }
  
    fetchMoods();
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3001/mapfoodtype/restaurant/${id}`)
      .then((response) => response.json())
      .then((data1) => {
        setRestaurantInfo(data1);
        console.log(data1);
      })
      .catch((error) => {
        console.error('음식점 정보를 가져오는 중 오류 발생:', error);
      });
  }, [id]);

  useEffect(() => {
    if (selectedRestaurant) {
      setRestaurantInfo(selectedRestaurant);
    }
  }, [selectedRestaurant]);

  const saveFavoriteToServer = (newIsFavorite) => {
    fetch('http://localhost:3001/restaurantdetail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ restaurantInfo, isFavorite: newIsFavorite }),
    })
    .then((response) => {
      if (response.ok) {
        console.log('음식점 정보가 성공적으로 저장되었습니다.');
      } else {
        console.error('음식점 정보 저장 중 오류 발생:', response.status);
      }
    })
    .catch((error) => {
      console.error('음식점 정보 저장 중 오류 발생:', error);
    });
  };


  const handleRatingChange = (newRating) => {
    // 별점이 변경될 때마다 localStorage에 저장합니다.
    setRating(newRating);
    localStorage.setItem(`rating_${id}`, newRating.toString());
  };

  const saveRatingToServer = () => {
    fetch('http://localhost:3001/saverating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ restaurantInfo, isFavorite }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('별점이 성공적으로 저장되었습니다.');
        } else {
          console.error('별점 저장 중 오류 발생:', response.status);
        }
      })
      .catch((error) => {
        console.error('별점 저장 중 오류 발생:', error);
      });
  };

  const toggleFavorite = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);
    saveFavoriteToServer(newIsFavorite);
  };

  return (
    <div>
      <style>
        {`
          .flavor_logo {
            left: -5px;
            display: block;
            margin: 30px auto 0;
          }
          
          .list_button {
            top: 5px;
            left: 100px;
            background-color: #ff6480;
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 0px 0px 2%;
          }

          .list_button:hover {
            background-color: #c24e63;
          }

          .restaurant_detail,
          .restaurant_content {
            top: 10px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #f7f7f7;
            max-width: 400px;
            margin: 0 auto;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          .restaurant_content {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
          }

          .star_container {
            display: flex;
            align-items: center;
          }

          .star {
            font-size: 24px;
            cursor: pointer;
            color: #ccc;
            margin-right: 5px;
          }

          .filled {
            color: #f7db45;
          }

          .heart_button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 24px;
            color: #ccc;
            position: absolute;
            top: -10px;
            right: 0px;
          }

          .heart_button.filled {
            color: #dc2a2d;
          }

          .save_button {
            top: 5px;
            left: 70px;
            background-color: #ff6480;
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px 0px 0px 2%;
          }

          .save_button:hover {
            background-color: #c24e63;
          }

          .restaurant_menu {
            margin: 0px 40px 0px 10px;
            border: none;
            cursor: pointer;
          }
          
          .restaurant_review {
            margin: 0px 10px 0px 40px;
            border: none;
            cursor: pointer;
          }
          
        `}
      </style>
      <Link to="/">
        <button type="flavor_logo" className="flavor_logo">
          <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FNCkp7%2Fbtshz0iU8wZ%2FGdartd1kgTj0ZXMhJ0IKwk%2Fimg.png" width="300" height="105" alt="flavor_logo" />
        </button>
      </Link>
      <div className="restaurant_detail">
        {restaurantInfo ? (
          <div>
            <h2>{restaurantInfo.title}</h2>
            <p>전화번호: {restaurantInfo.phone_number}</p>
            <p>대표 메뉴: {restaurantInfo.menu}</p>
            <p>종류: {restaurantInfo.type}</p>
            <p>주소: {restaurantInfo.address}</p>
            <p>분위기: {restaurantInfo.md}</p>
            <p>별점: {rating}</p>

            {/* "찜하기" 버튼 */}
            <button className={`heart_button ${isFavorite ? 'filled' : ''}`}
              onClick={() => {
                toggleFavorite();
              }} > ♥ </button>

            {/* 별점 UI */}
            <div className="star_container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`star ${star <= rating ? 'filled' : ''}`}
                  onClick={() => handleRatingChange(star)} >
                  {star <= rating ? '★' : '☆'}
                  {/* 테두리 없는 거 ★ */}
                </span>
              ))}
            </div>
            <button className="save_button"
              onClick={() => saveRatingToServer()}> 별점 저장 </button>
            <button className="list_button"
              onClick={() => navigate('/mapfoodtype')}>지도 보기</button>
          </div>
        ) : (
          <p>음식점 정보 로딩 중...</p>
        )}
      </div>
      {/* <div className="restaurant_content">
        <button className="restaurant_menu">메뉴</button>
        <button className="restaurant_review">리뷰</button>
        {restaurantInfo && restaurantInfo.menu_detail && (
          <div className="menu_detail">상세메뉴 {restaurantInfo.menu_detail}</div>
        )}
      </div> */}
    </div>
  );
};

export default RestaurantDetail;